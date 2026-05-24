import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReposContent } from "@/components/repos/repos-content";
import { OperationBlock } from "@/components/swagger/operation-block";
import { collectRepoLanguages } from "@/lib/languages";
import { getDeveloperData } from "@/lib/github";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "repos" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates("/repos"),
  };
}

export default async function ReposPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("repos");
  const data = await getDeveloperData();
  const languages = collectRepoLanguages(data.repositories);

  return (
    <div className="flex flex-col gap-8">
      <OperationBlock
        method="GET"
        path="/repos"
        summary={t("listSummary", { count: data.repositories.length })}
      >
        <ReposContent
          repositories={data.repositories}
          languages={languages}
          currentLanguage={null}
        />
      </OperationBlock>
    </div>
  );
}
