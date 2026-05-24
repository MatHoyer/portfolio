import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodePanel } from "@/components/swagger/code-panel";
import { OperationBlock } from "@/components/swagger/operation-block";
import { SchemaTable } from "@/components/swagger/schema-table";
import { LanguageIcon } from "@/components/language/language-icon";
import { formatLanguageLabel, normalizeLanguageKey } from "@/lib/languages";
import { getDeveloperData } from "@/lib/github";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates("/profile"),
  };
}

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("profile");
  const tCommon = await getTranslations("common");
  const data = await getDeveloperData();

  const schemaRows = [
    { name: "name", type: "string", value: "Mathieu HOYER", required: true },
    { name: "email", type: "string", value: data.email, required: false },
    { name: "company", type: "string", value: data.company, required: false },
    { name: "location", type: "string", value: data.location, required: false },
    {
      name: "totalCommitContributions",
      type: "integer",
      value: data.totalCommitContributions,
      required: true,
    },
    { name: "totalRepos", type: "integer", value: data.totalRepos, required: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      <OperationBlock method="GET" path="/developer" summary={t("summary")}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-20 border-2 border-[var(--swagger-post)]">
              <AvatarImage src="https://github.com/MatHoyer.png" alt="Mathieu HOYER" />
              <AvatarFallback className="bg-swagger-surface-muted text-xl">MH</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-mono text-2xl font-bold text-swagger-text">Mathieu HOYER</h1>
              <p className="text-swagger-muted">
                {data.company ?? "—"} @ {data.location ?? "—"}
              </p>
              <p className="text-sm text-swagger-muted">
                {t("commitsAcross", {
                  commits: data.totalCommitContributions,
                  repos: data.totalRepos,
                })}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-mono text-sm font-semibold text-[var(--swagger-post)]">
              {tCommon("schema")}
            </h3>
            <SchemaTable rows={schemaRows} />
          </div>

          {data.languagesCount.length > 0 && (
            <div>
              <h3 className="mb-2 font-mono text-sm font-semibold text-[var(--swagger-post)]">
                {t("skillDistribution")}
              </h3>
              <div className="flex flex-col gap-2">
                {data.languagesCount.map((lang) => (
                  <div
                    key={lang.name}
                    className="grid grid-cols-[7rem_minmax(0,1fr)_2.75rem] items-center gap-x-3"
                  >
                    <span className="flex min-w-0 items-center gap-2 font-mono text-sm">
                      <LanguageIcon name={lang.name} size={18} className="shrink-0" />
                      <span className="truncate">
                        {formatLanguageLabel(normalizeLanguageKey(lang.name))}
                      </span>
                    </span>
                    <div className="h-2 min-w-0 overflow-hidden rounded bg-swagger-border">
                      <div
                        className="h-full bg-[var(--swagger-get)]"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                    <span className="text-right font-mono text-xs tabular-nums text-swagger-muted">
                      {lang.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <a
              href="https://github.com/MatHoyer"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-[var(--swagger-get)] font-mono text-[var(--swagger-get)] hover:bg-[var(--swagger-get)]/10",
              )}
            >
              {t("viewOnGitHub")}
            </a>
            <Link
              href="/contact-me"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-[var(--swagger-post)] font-mono text-[var(--swagger-post)] hover:bg-[var(--swagger-post)]/10",
              )}
            >
              {t("postContact")}
            </Link>
          </div>

          <div>
            <h3 className="mb-2 font-mono text-sm font-semibold text-[var(--swagger-post)]">
              {tCommon("response200")}
            </h3>
            <CodePanel data={data} />
          </div>
        </div>
      </OperationBlock>
    </div>
  );
}
