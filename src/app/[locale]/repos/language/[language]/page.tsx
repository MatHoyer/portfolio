import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReposContent } from "@/components/repos/repos-content";
import { SyncLanguageUrl } from "@/components/language/sync-language-url";
import { OperationBlock } from "@/components/swagger/operation-block";
import { buttonVariants } from "@/components/ui/button";
import {
  collectRepoLanguages,
  formatLanguageLabel,
  languageFilterPath,
  normalizeLanguageKey,
  slugToLanguage,
} from "@/lib/languages";
import { cn } from "@/lib/utils";
import { getDeveloperData } from "@/lib/github";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string; language: string }>;
};

export async function generateStaticParams() {
  const data = await getDeveloperData();
  const languages = collectRepoLanguages(data.repositories);
  return languages.map((language) => ({
    language: normalizeLanguageKey(language),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, language: slug } = await params;
  const language = slugToLanguage(slug);
  const t = await getTranslations({ locale, namespace: "repos" });

  return {
    title: t("metaByLanguageTitle", { language: formatLanguageLabel(language) }),
    description: t("metaByLanguageDescription", {
      language: formatLanguageLabel(language),
    }),
    alternates: localeAlternates(languageFilterPath(language)),
  };
}

export default async function ReposByLanguagePage({ params }: Props) {
  const { locale, language: slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("repos");
  const language = slugToLanguage(slug);
  const data = await getDeveloperData();
  const languages = collectRepoLanguages(data.repositories);

  if (!languages.includes(language)) {
    notFound();
  }

  const filtered = data.repositories.filter((repo) =>
    repo.languages.some((l) => slugToLanguage(l.name) === language),
  );

  return (
    <div className="flex flex-col gap-8">
      <SyncLanguageUrl language={language} />
      <OperationBlock
        method="GET"
        path={languageFilterPath(language)}
        summary={t("filterBySummary", {
          language: formatLanguageLabel(language),
          count: filtered.length,
        })}
      >
        <ReposContent
          repositories={data.repositories}
          languages={languages}
          currentLanguage={language}
        />
      </OperationBlock>
      <Link
        href="/repos"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-fit border-swagger-border font-mono text-swagger-muted",
        )}
      >
        {t("backToAll")}
      </Link>
    </div>
  );
}
