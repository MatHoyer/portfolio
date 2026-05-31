"use client";

import { MethodBadge } from "@/components/swagger/method-badge";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function isNavActive(pathname: string, itemPath: string): boolean {
  if (itemPath === "/") return pathname === "/";
  if (itemPath === "/repos") {
    return pathname === "/repos" || pathname.startsWith("/repos/");
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

function NavLink({
  href,
  active,
  onNavigate,
  className,
  children,
}: {
  href: string;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        className,
        active && "bg-swagger-surface-muted font-semibold text-swagger-text",
      )}
    >
      {children}
    </Link>
  );
}

export function ApiNav({
  variant,
  onNavigate,
}: {
  variant: "sidebar" | "sheet" | "bottom";
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const tagKeys = [...new Set(navItems.map((item) => item.tagKey))];

  if (variant === "bottom") {
    return (
      <nav className="grid grid-cols-4" aria-label={t("bottomNav")}>
        {navItems.map((item) => {
          const active = isNavActive(pathname, item.path);
          return (
            <NavLink
              key={item.path}
              href={item.path}
              active={active}
              onNavigate={onNavigate}
              className="flex flex-col items-center gap-1 px-1 py-2 text-swagger-muted hover:text-swagger-text"
            >
              <MethodBadge
                method={item.method}
                className="min-w-10 px-1.5 py-0.5 text-[9px]"
              />
              <span className="max-w-full truncate text-center font-mono text-[10px] leading-tight">
                {t(item.nameKey)}
              </span>
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      {tagKeys.map((tagKey) => (
        <div key={tagKey} className="mb-6 last:mb-0">
          <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--swagger-post)]">
            {t(tagKey)}
          </h2>
          <nav className="flex flex-col gap-1">
            {navItems
              .filter((item) => item.tagKey === tagKey)
              .map((item) => {
                const active = isNavActive(pathname, item.path);
                return (
                  <NavLink
                    key={item.path}
                    href={item.path}
                    active={active}
                    onNavigate={onNavigate}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-swagger-surface-muted"
                  >
                    <MethodBadge method={item.method} className="min-w-12 text-[10px]" />
                    <span className="truncate font-mono text-xs">{item.path}</span>
                  </NavLink>
                );
              })}
          </nav>
        </div>
      ))}
    </>
  );
}
