import { LanguageIcon } from "@/components/language/language-icon";
import { Link } from "@/i18n/navigation";
import {
  formatLanguageLabel,
  languageColor,
  languageFilterPath,
  normalizeLanguageKey,
} from "@/lib/languages";
import type { Language } from "@/lib/types";

/** Ranked language rows. Names link to /repos/language/[language] when that page exists. */
export function LanguageBars({
  languages,
  linkable,
}: {
  languages: Language[];
  linkable: Set<string>;
}) {
  return (
    <ol className="flex flex-col">
      {languages.map((lang) => {
        const key = normalizeLanguageKey(lang.name);
        const label = (
          <span className="flex min-w-0 items-center gap-2.5 font-mono text-sm text-swagger-text">
            <LanguageIcon name={lang.name} size={18} className="shrink-0" />
            <span className="truncate">{formatLanguageLabel(key)}</span>
          </span>
        );
        return (
          <li
            key={lang.name}
            className="grid grid-cols-[8rem_minmax(0,1fr)_3rem] items-center gap-4 border-t border-swagger-border py-3 sm:grid-cols-[10rem_minmax(0,1fr)_3rem]"
          >
            {linkable.has(key) ? (
              <Link href={languageFilterPath(key)} className="hover:underline">
                {label}
              </Link>
            ) : (
              label
            )}
            <div className="h-1.5 overflow-hidden rounded-full bg-swagger-surface-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${lang.percentage}%`, background: languageColor(lang.name) }}
              />
            </div>
            <span className="text-right font-mono text-xs tabular-nums text-swagger-muted">
              {lang.percentage}%
            </span>
          </li>
        );
      })}
    </ol>
  );
}
