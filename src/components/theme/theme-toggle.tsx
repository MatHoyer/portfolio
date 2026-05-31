"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = ["light", "dark", "system"] as const;
type ThemeValue = (typeof themes)[number];

const themeIcons: Record<ThemeValue, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

function ThemeOption({ theme }: { theme: ThemeValue }) {
  const t = useTranslations("theme");
  const Icon = themeIcons[theme];

  return (
    <span className="flex items-center gap-1.5">
      <Icon className="size-3.5 shrink-0" aria-hidden />
      {t(theme)}
    </span>
  );
}

export function ThemeToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = (theme ?? "system") as ThemeValue;
  const CurrentIcon = themeIcons[current];

  return (
    <Select
      value={current}
      disabled={!mounted}
      onValueChange={(value) => setTheme(value as ThemeValue)}
    >
      <SelectTrigger
        aria-label={t("label")}
        className={cn(
          "h-8 w-auto border-white/20 bg-white/10 font-mono text-xs text-white hover:bg-white/15 [&_svg]:text-white/70",
          compact
            ? "min-w-0 px-2 sm:min-w-28 sm:pr-1.5 sm:pl-2"
            : "min-w-28 pr-1.5 pl-2",
          className,
        )}
      >
        {compact ? (
          <>
            <span className="sm:hidden">
              <CurrentIcon className="size-3.5 shrink-0" aria-hidden />
            </span>
            <span className="hidden sm:inline">
              <ThemeOption theme={current} />
            </span>
          </>
        ) : (
          <ThemeOption theme={current} />
        )}
      </SelectTrigger>
      <SelectContent>
        {themes.map((value) => (
          <SelectItem key={value} value={value} className="font-mono text-xs">
            <ThemeOption theme={value} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
