"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

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
        className="h-8 w-[7.5rem] border-white/20 bg-white/10 font-mono text-xs text-white hover:bg-white/15"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc} className="font-mono text-xs">
            {t(loc)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
