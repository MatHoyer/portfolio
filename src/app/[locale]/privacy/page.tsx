import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates("/privacy"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");

  const dataRows = [
    { name: "hosting", value: t("hosting") },
    { name: "analytics", value: t("analytics") },
    { name: "githubData", value: t("githubData") },
    { name: "contact", value: t("contactValue") },
    { name: "retention", value: t("retention") },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader tag="GET /privacy" title={t("title")}>
        {t("intro")}
      </PageHeader>

      <dl className="flex flex-col">
        {dataRows.map((row) => (
          <div
            key={row.name}
            className="grid gap-1 border-t border-swagger-border py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="font-mono text-sm text-swagger-muted">{row.name}</dt>
            <dd className="text-swagger-text">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex max-w-[60ch] flex-col gap-3 text-sm text-swagger-muted">
        <p>
          {t("githubNote")}{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-swagger-link hover:underline"
          >
            {t("githubLink")}
          </a>
          .
        </p>
        <p>
          {t("questions")}{" "}
          <a href="mailto:contact@mathieuhoyer.fr" className="text-swagger-link hover:underline">
            contact@mathieuhoyer.fr
          </a>
        </p>
      </div>
    </div>
  );
}
