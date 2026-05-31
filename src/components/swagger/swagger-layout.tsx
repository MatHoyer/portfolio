"use client";

import { LocaleSelect } from "@/components/i18n/locale-select";
import { ApiNav } from "@/components/swagger/api-nav";
import { MobileBottomNav } from "@/components/swagger/mobile-bottom-nav";
import { MobileNavSheet } from "@/components/swagger/mobile-nav-sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function SwaggerLayout({
  appVersion,
  children,
}: {
  appVersion: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("nav");

  return (
    <div className="flex min-h-screen flex-col bg-swagger-bg text-swagger-text">
      <header className="flex items-center justify-between gap-2 bg-swagger-topbar px-4 py-3 text-white md:gap-4 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
          <MobileNavSheet />
          <span className="hidden rounded bg-[var(--swagger-topbar-accent)] px-2 py-0.5 font-mono text-xs font-bold text-white sm:inline">
            OAS 3.1
          </span>
          <Link href="/" className="truncate font-semibold hover:underline">
            Mathieu HOYER
          </Link>
          <span className="hidden shrink-0 font-mono text-xs text-white/70 sm:inline">
            {appVersion}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <ThemeToggle compact />
          <LocaleSelect compact />
          <a
            href="https://github.com/MatHoyer"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-sm text-[var(--swagger-topbar-accent)] hover:underline sm:inline"
          >
            github.com/MatHoyer
          </a>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r border-swagger-border bg-swagger-surface p-4 md:block">
          <ApiNav variant="sidebar" />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-[calc(4rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
          <footer className="border-t border-swagger-border bg-swagger-surface px-4 py-3 text-center text-xs text-swagger-muted md:px-8">
            <Link href="/privacy" className="text-swagger-link hover:underline">
              {t("privacy")}
            </Link>
            <span className="mx-2">·</span>
            <span>{t("footerStatic")}</span>
          </footer>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
