"use client";

import { ApiNav } from "@/components/swagger/api-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function MobileNavSheet() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/15 md:hidden"
          />
        }
      >
        <Menu className="size-4" />
        <span className="sr-only">{t("openMenu")}</span>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="gap-0 border-swagger-border bg-swagger-surface p-0 text-swagger-text"
      >
        <SheetHeader className="border-b border-swagger-border">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[var(--swagger-topbar-accent)] px-2 py-0.5 font-mono text-xs font-bold text-white">
              OAS 3.1
            </span>
            <SheetTitle className="font-mono text-sm text-swagger-text">
              Developer API
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <ApiNav variant="sheet" onNavigate={() => setOpen(false)} />
        </div>
        <div className="border-t border-swagger-border p-4">
          <a
            href="https://github.com/MatHoyer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--swagger-topbar-accent)] hover:underline"
          >
            github.com/MatHoyer
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
