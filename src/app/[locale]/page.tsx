import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { CodePanel } from "@/components/swagger/code-panel";
import { RepoCard } from "@/components/swagger/repo-card";
import { Link } from "@/i18n/navigation";
import { getDeveloperData } from "@/lib/github";
import { createSiteMetadata, localeAlternates, localeCanonical } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...(await createSiteMetadata(locale)),
    alternates: {
      canonical: localeCanonical(locale, "/"),
      ...localeAlternates("/"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const data = await getDeveloperData();
  const featured = data.repositories.filter((repo) => repo.description).slice(0, 6);

  return (
    <div className="flex flex-col gap-14">
      <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="flex flex-col items-start">
          <span className="font-mono text-xs tracking-wide text-[var(--swagger-accent-text)]">
            GET /me
          </span>
          <h1 className="mt-3 text-4xl leading-[1] font-extrabold tracking-tight text-balance text-swagger-text sm:text-5xl xl:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-swagger-muted">
            {t.rich("pitch", {
              b: (chunks) => <span className="text-swagger-text">{chunks}</span>,
            })}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
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
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl border border-swagger-border bg-[var(--swagger-code-bg)] text-[var(--swagger-code-text)] shadow-lg">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 font-mono text-xs text-white/60">
            <span className="font-bold text-[#5fd39a]">200 OK</span>
            <span>application/json</span>
          </div>
          <CodePanel
            className="rounded-none border-0"
            data={{
              name: "Mathieu Hoyer",
              role: t("role"),
              company: data.company,
              location: data.location,
              stack: data.languagesCount.slice(0, 4).map((lang) => lang.name),
              repos: data.totalRepos,
              commits: data.totalCommitContributions,
            }}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold tracking-tight text-swagger-text">
          {t("featuredRepos")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
        {data.repositories.length > featured.length && (
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
