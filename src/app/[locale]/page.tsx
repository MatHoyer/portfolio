import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CodePanel } from "@/components/swagger/code-panel";
import { OperationBlock } from "@/components/swagger/operation-block";
import { RepoCard } from "@/components/swagger/repo-card";
import { Link } from "@/i18n/navigation";
import { getDeveloperData } from "@/lib/github";
import { localeAlternates } from "@/lib/metadata";
import { navItems } from "@/lib/nav";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: localeAlternates("/"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const data = await getDeveloperData();
  const featured = data.repositories.slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="mb-2 font-mono text-3xl font-bold text-swagger-text">{t("title")}</h1>
        <p className="mb-4 text-swagger-muted">{t("subtitle")}</p>
        <CodePanel
          data={{
            version: "1.0.0",
            title: "Mathieu HOYER API",
            description: t("codeDescription"),
            totalRepos: data.totalRepos,
            totalCommits: data.totalCommitContributions,
          }}
        />
      </section>

      <OperationBlock method="GET" path="/" summary={t("overviewSummary")}>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-swagger-muted">{t("availableEndpoints")}</p>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="font-mono text-sm text-swagger-link hover:underline"
                >
                  {item.method} {item.path}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </OperationBlock>

      <section>
        <h2 className="mb-4 font-mono text-xl font-semibold text-[var(--swagger-post)]">
          {t("featuredRepos")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
        {data.repositories.length > 6 && (
          <Link
            href="/repos"
            className="mt-4 inline-block font-mono text-sm text-swagger-link hover:underline"
          >
            {t("viewAllRepos", { count: data.totalRepos })}
          </Link>
        )}
      </section>
    </div>
  );
}
