import type { Metadata } from "next";
import { redirect } from "next/navigation";
import en from "../../messages/en.json";
import { routing } from "@/i18n/routing";
import { getMetadataBase, getSiteUrl } from "@/lib/metadata";

const defaultLocale = routing.defaultLocale;

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: en.metadata.siteTitle,
  description: en.metadata.siteDescription,
  alternates: {
    canonical: `${getSiteUrl()}/${defaultLocale}/`,
  },
  robots: { index: false, follow: true },
};

export default function RootPage() {
  redirect(`/${defaultLocale}/`);
}
