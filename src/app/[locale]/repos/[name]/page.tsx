import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageLabel } from "@/components/language/language-label";
import { Badge } from "@/components/ui/badge";
import { CodePanel } from "@/components/swagger/code-panel";
import { OperationBlock } from "@/components/swagger/operation-block";
import { SchemaTable } from "@/components/swagger/schema-table";
import { getDeveloperData, getRepoNames } from "@/lib/github";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string; name: string }>;
};

export async function generateStaticParams() {
  const names = await getRepoNames();
  return names.map((name) => ({ name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, name } = await params;
  const t = await getTranslations({ locale, namespace: "repo" });

  return {
    title: name,
    description: t("metaDescription", { name }),
    alternates: localeAlternates(`/repos/${name}`),
  };
}

export default async function RepoPage({ params }: Props) {
  const { locale, name } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("repo");
  const tCommon = await getTranslations("common");
  const data = await getDeveloperData();
  const repo = data.repositories.find((r) => r.name === name);

  if (!repo) {
    notFound();
  }

  const schemaRows = [
    { name: "name", type: "string", value: repo.name, required: true },
    { name: "description", type: "string", value: repo.description, required: false },
    { name: "stargazerCount", type: "integer", value: repo.stargazerCount, required: true },
    { name: "forkCount", type: "integer", value: repo.forkCount, required: true },
    { name: "url", type: "string", value: repo.url, required: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      <OperationBlock method="GET" path={`/repos/${repo.name}`} summary={repo.description ?? ""}>
        <div className="flex flex-col gap-6">
          <h1 className="font-mono text-2xl font-bold text-[var(--swagger-get)]">{repo.name}</h1>

          <SchemaTable rows={schemaRows} />

          {repo.languages.length > 0 && (
            <div>
              <h3 className="mb-2 font-mono text-sm font-semibold text-[var(--swagger-post)]">
                {tCommon("languagesArray")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {repo.languages.map((lang) => (
                  <Badge
                    key={lang.name}
                    className="border-swagger-border bg-swagger-surface-muted py-1 text-[var(--swagger-post)]"
                  >
                    <LanguageLabel
                      name={lang.name}
                      percentage={lang.percentage}
                      iconSize={16}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "bg-[var(--swagger-get)] font-mono font-bold hover:opacity-90",
              )}
            >
              {t("openOnGitHub")}
            </a>
            <Link
              href="/repos"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-swagger-border font-mono text-swagger-muted",
              )}
            >
              {t("backToRepos")}
            </Link>
          </div>

          <div>
            <h3 className="mb-2 font-mono text-sm font-semibold text-[#49cc90]">
              {tCommon("response200")}
            </h3>
            <CodePanel data={repo} />
          </div>
        </div>
      </OperationBlock>
    </div>
  );
}
