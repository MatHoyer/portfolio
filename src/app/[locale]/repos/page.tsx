import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { ReposContent } from "@/components/repos/repos-content";
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
      <PageHeader tag="GET /repos" title={t("title")}>
        {t("subtitle", { count: data.repositories.length })}
      </PageHeader>
      <ReposContent
        repositories={data.repositories}
        languages={languages}
        currentLanguage={null}
      />
    </div>
  );
}
