import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/layout/locale-shell";
import { routing, type Locale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("siteTitle"),
      template: "%s | Mathieu HOYER",
    },
    description: t("siteDescription"),
    openGraph: {
      title: t("siteTitle"),
      description: t("ogDescription"),
      type: "website",
    },
    alternates: localeAlternates("/"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <LocaleShell locale={locale as Locale}>{children}</LocaleShell>;
}
