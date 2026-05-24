"use client";

import { useEffect } from "react";
import { languageToSlug, normalizeLanguageKey } from "@/lib/languages";

/** Keep the address bar encoded when static export serves decoded paths. */
export function SyncLanguageUrl({ language }: { language: string }) {
  useEffect(() => {
    const key = normalizeLanguageKey(language);
    const encodedSegment = languageToSlug(key);
    const { pathname, search, hash } = window.location;

    if (
      pathname.includes(`/repos/language/${key}`) &&
      !pathname.includes(encodedSegment)
    ) {
      const next = pathname.replace(
        `/repos/language/${key}`,
        `/repos/language/${encodedSegment}`,
      );
      window.history.replaceState(null, "", `${next}${search}${hash}`);
    }
  }, [language]);

  return null;
}
