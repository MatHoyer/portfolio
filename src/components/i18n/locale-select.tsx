"use client";

import { LocaleFlag } from "@/components/i18n/locale-flags";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

function LocaleOption({ locale, flagSize = 14 }: { locale: Locale; flagSize?: number }) {
  const t = useTranslations("locale");

  return (
    <span className="flex items-center gap-1.5">
      <LocaleFlag locale={locale} size={flagSize} className="shrink-0" />
      {t(locale)}
    </span>
  );
}

export function LocaleSelect() {
  const t = useTranslations("locale");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={locale}
      disabled={isPending}
      onValueChange={(next) => {
        startTransition(() => {
          router.replace(
            // @ts-expect-error -- pathname is locale-aware; params match current route
            { pathname, params },
            { locale: next as Locale },
          );
        });
      }}
    >
      <SelectTrigger
        aria-label={t("label")}
        className="h-8 w-auto min-w-34 border-white/20 bg-white/10 pr-1.5 pl-2 font-mono text-xs text-white hover:bg-white/15"
      >
        <LocaleOption locale={locale} />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc} className="font-mono text-xs">
            <LocaleOption locale={loc} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
