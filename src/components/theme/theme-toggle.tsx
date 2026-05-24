"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const cycle = ["light", "dark", "system"] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = theme ?? "system";
  const Icon =
    current === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  function handleClick() {
    const index = cycle.indexOf(current as (typeof cycle)[number]);
    const next = cycle[(index + 1) % cycle.length];
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!mounted}
      aria-label={
        mounted
          ? `Theme: ${current}. Click to change.`
          : "Toggle theme"
      }
      className={cn(
        "inline-flex size-8 items-center justify-center rounded border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/15 disabled:opacity-50",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
