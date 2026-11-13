import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodePanel } from "@/components/swagger/code-panel";
import { LanguageBars } from "@/components/language/language-bars";
import { collectRepoLanguages, formatLanguageLabel, normalizeLanguageKey } from "@/lib/languages";
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
  const languagePages = new Set(collectRepoLanguages(data.repositories));
  const topLanguage = data.languagesCount[0];

  const stats = [
    { label: t("statRepos"), value: data.totalRepos },
    { label: t("statCommits"), value: data.totalCommitContributions },
    { label: t("statLanguages"), value: data.languagesCount.length },
  ];

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-24 ring-2 ring-[var(--swagger-topbar-accent)] ring-offset-4 ring-offset-swagger-bg">
            <AvatarImage src="https://github.com/MatHoyer.png" alt="Mathieu Hoyer" />
            <AvatarFallback className="bg-swagger-surface-muted text-2xl font-bold">MH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="font-mono text-xs tracking-wide text-[var(--swagger-accent-text)]">
              GET /developer
            </span>
            <h1 className="mt-2 text-4xl leading-none font-extrabold tracking-tight text-swagger-text sm:text-5xl">
              Mathieu Hoyer
            </h1>
            <p className="mt-3 text-lg text-swagger-muted">
              {[t("role"), data.company, data.location].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact-me"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 bg-[var(--swagger-topbar-accent)] px-4 font-mono font-bold text-[var(--swagger-topbar)] hover:opacity-90",
            )}
          >
            POST /contact-me
          </Link>
          <a
            href="https://github.com/MatHoyer"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-10 border-swagger-border bg-transparent px-4 font-mono text-swagger-text",
            )}
          >
            github.com/MatHoyer
          </a>
        </div>
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

      {topLanguage && (
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-swagger-text">
              {t("languagesTitle")}
            </h2>
            <p className="text-sm text-swagger-muted">
              {t("languagesNote", {
                top: formatLanguageLabel(normalizeLanguageKey(topLanguage.name)),
              })}
            </p>
          </div>
          <LanguageBars languages={data.languagesCount} linkable={languagePages} />
        </section>
      )}

      <details className="rounded-xl border border-swagger-border bg-swagger-surface p-4">
        <summary className="cursor-pointer font-mono text-sm font-semibold text-[var(--swagger-post)] marker:text-swagger-muted">
          {tCommon("response200")}{" "}
          <span className="font-normal text-swagger-muted">{tCommon("fullJson")}</span>
        </summary>
        <CodePanel data={data} className="mt-4" />
      </details>
    </div>
  );
}
