import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mathoyer.dev";

/** Build hreflang alternates for /en/... and /fr/... */
export function localeAlternates(
  pathname: string,
  locales: readonly Locale[] = ["en", "fr"],
): Metadata["alternates"] {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const path = normalized === "/" ? "" : normalized;
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = `${siteUrl}/${locale}${path}`;
  }

  languages["x-default"] = languages.en;

  return { languages };
}
