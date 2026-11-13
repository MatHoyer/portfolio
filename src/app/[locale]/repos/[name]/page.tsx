import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodePanel } from "@/components/swagger/code-panel";
import { LanguageBars } from "@/components/language/language-bars";
import { collectRepoLanguages } from "@/lib/languages";
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

  const languages = repo.languages.filter((lang) => lang.percentage > 0);
  const stats = [
    { label: t("statStars"), value: repo.stargazerCount },
    { label: t("statForks"), value: repo.forkCount },
    { label: t("statLanguages"), value: languages.length },
  ];

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col items-start">
          <Link
            href="/repos"
            className="mb-6 font-mono text-xs text-swagger-muted hover:text-swagger-text"
          >
            {t("backToRepos")}
          </Link>
          <span className="font-mono text-xs tracking-wide text-[var(--swagger-accent-text)]">
            GET /repos/{repo.name}
          </span>
          <h1 className="mt-2 max-w-full font-mono text-3xl leading-tight font-bold tracking-tight break-words text-swagger-text sm:text-5xl">
            {repo.name}
          </h1>
          {repo.description && (
            <p className="mt-4 max-w-[60ch] text-lg text-swagger-muted">{repo.description}</p>
          )}
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-10 w-fit shrink-0 bg-[var(--swagger-topbar-accent)] px-4 font-mono font-bold text-[var(--swagger-topbar)] hover:opacity-90",
          )}
        >
          {t("openOnGitHub")} ↗
        </a>
      </section>

      <dl className="grid grid-cols-3 divide-x divide-swagger-border rounded-xl border border-swagger-border bg-swagger-surface">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 px-4 py-5 sm:px-6">
            <dt className="font-mono text-xs text-swagger-muted">{stat.label}</dt>
            <dd className="text-3xl font-extrabold tracking-tight tabular-nums text-swagger-text sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {languages.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-bold tracking-tight text-swagger-text">
            {t("languagesTitle")}
          </h2>
          <LanguageBars
            languages={languages}
            linkable={new Set(collectRepoLanguages(data.repositories))}
          />
        </section>
      )}

      <details className="rounded-xl border border-swagger-border bg-swagger-surface p-4">
        <summary className="cursor-pointer font-mono text-sm font-semibold text-[var(--swagger-post)] marker:text-swagger-muted">
          {tCommon("response200")}{" "}
          <span className="font-normal text-swagger-muted">{tCommon("fullJson")}</span>
        </summary>
        <CodePanel data={repo} className="mt-4" />
      </details>
    </div>
  );
}
