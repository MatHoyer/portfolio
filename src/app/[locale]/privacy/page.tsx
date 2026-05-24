import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OperationBlock } from "@/components/swagger/operation-block";
import { SchemaTable } from "@/components/swagger/schema-table";
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
    { name: "hosting", type: "string", value: t("hosting") },
    { name: "analytics", type: "null", value: t("analytics") },
    { name: "githubData", type: "object", value: t("githubData") },
    { name: "contact", type: "mailto", value: t("contactValue") },
    { name: "retention", type: "string", value: t("retention") },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="mb-2 font-mono text-3xl font-bold text-swagger-text">{t("title")}</h1>
        <p className="max-w-2xl text-sm text-swagger-muted">{t("intro")}</p>
      </section>

      <OperationBlock method="GET" path="/privacy" summary={t("summary")}>
        <div className="flex flex-col gap-4">
          <SchemaTable rows={dataRows} />
          <p className="text-sm text-swagger-muted">
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
          <p className="text-sm text-swagger-muted">
            {t("questions")}{" "}
            <a
              href="mailto:mathieuhoyer@gmail.com"
              className="text-swagger-link hover:underline"
            >
              mathieuhoyer@gmail.com
            </a>
          </p>
        </div>
      </OperationBlock>
    </div>
  );
}
