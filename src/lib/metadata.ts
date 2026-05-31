import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://mathoyer.dev";
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

/** Shared title, description, and Open Graph defaults for the site. */
export async function createSiteMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: t("siteTitle"),
      template: "%s | Mathieu HOYER",
    },
    description: t("siteDescription"),
    openGraph: {
      title: t("siteTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
    twitter: {
      card: "summary",
      title: t("siteTitle"),
      description: t("ogDescription"),
    },
  };
}

/** Build hreflang alternates for /en/... and /fr/... */
export function localeAlternates(
  pathname: string,
  locales: readonly Locale[] = ["en", "fr"],
): Metadata["alternates"] {
  const siteUrl = getSiteUrl();
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const path = normalized === "/" ? "" : normalized;
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = `${siteUrl}/${locale}${path}`;
  }

  languages["x-default"] = languages.en;

  return { languages };
}

export function localeCanonical(locale: string, pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const path = normalized === "/" ? "/" : normalized;
  return `${getSiteUrl()}/${locale}${path === "/" ? "/" : path}`;
}
