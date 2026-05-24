"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatLanguageLabel,
  languageToSlug,
  normalizeLanguageKey,
} from "@/lib/languages";
import { useRouter } from "@/i18n/navigation";
import { LanguageIcon } from "./language-icon";
import { useTranslations } from "next-intl";

const ALL_VALUE = "__all__";

export function LanguageSelect({
  languages,
  currentLanguage,
}: {
  languages: string[];
  currentLanguage: string | null;
}) {
  const router = useRouter();
  const t = useTranslations("repos");
  const value = currentLanguage
    ? normalizeLanguageKey(currentLanguage)
    : ALL_VALUE;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <label className="font-mono text-sm font-semibold text-[var(--swagger-post)]">
        {t("filterLabel")}
      </label>
      <Select
        value={value}
        onValueChange={(next) => {
          if (!next || next === ALL_VALUE) {
            router.push("/repos");
          } else {
            router.push(`/repos/language/${languageToSlug(next)}`);
          }
        }}
      >
        <SelectTrigger className="w-full min-w-[200px] border-swagger-border bg-swagger-surface font-mono sm:w-[240px]">
          <SelectValue placeholder={t("allLanguages")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>
            <span className="flex items-center gap-2">
              <LanguageIcon name="code" size={18} />
              {t("allLanguages")}
            </span>
          </SelectItem>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              <span className="flex items-center gap-2">
                <LanguageIcon name={lang} size={18} />
                {formatLanguageLabel(lang)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
