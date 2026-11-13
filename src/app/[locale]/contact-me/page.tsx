import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/swagger/contact-form";
import { getDeveloperData } from "@/lib/github";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates("/contact-me"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const { email } = await getDeveloperData();

  return (
    <div className="flex flex-col gap-10">
      <PageHeader tag="POST /contact-me" title={t("title")}>
        {t("intro")}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="rounded-xl border border-swagger-border bg-swagger-surface p-5 sm:p-6">
          <ContactForm email={email} />
        </div>

        <aside className="flex flex-col gap-5 rounded-xl border border-swagger-border bg-swagger-surface p-5 sm:p-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-swagger-muted">{t("orEmail")}</span>
            <a
              href={`mailto:${email}`}
              className="font-mono text-sm break-all text-swagger-text select-all hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="flex flex-col gap-1 border-t border-swagger-border pt-5">
            <span className="font-mono text-xs text-swagger-muted">GitHub</span>
            <a
              href="https://github.com/MatHoyer"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-swagger-text hover:underline"
            >
              github.com/MatHoyer ↗
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
