"use client";

import { LocaleSelect } from "@/components/i18n/locale-select";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { useTranslations } from "next-intl";
import { MethodBadge } from "./method-badge";

export function SwaggerLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");
  const tagKeys = [...new Set(navItems.map((item) => item.tagKey))];

  return (
    <div className="flex min-h-screen flex-col bg-swagger-bg text-swagger-text">
      <header className="flex items-center justify-between gap-4 bg-swagger-topbar px-6 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="rounded bg-[var(--swagger-topbar-accent)] px-2 py-0.5 font-mono text-xs font-bold text-white">
            OAS 3.1
          </span>
          <Link href="/" className="font-semibold hover:underline">
            Mathieu HOYER
          </Link>
          <span className="font-mono text-xs text-white/70">v1.0.0</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LocaleSelect />
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
          {tagKeys.map((tagKey) => (
            <div key={tagKey} className="mb-6">
              <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--swagger-post)]">
                {t(tagKey)}
              </h2>
              <nav className="flex flex-col gap-1">
                {navItems
                  .filter((item) => item.tagKey === tagKey)
                  .map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-swagger-surface-muted"
                    >
                      <MethodBadge method={item.method} className="min-w-12 text-[10px]" />
                      <span className="truncate font-mono text-xs">{item.path}</span>
                    </Link>
                  ))}
              </nav>
            </div>
          ))}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
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
    </div>
  );
}
