"use client";

import { ApiNav } from "@/components/swagger/api-nav";

export function MobileBottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-swagger-border bg-swagger-surface pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      <ApiNav variant="bottom" />
    </div>
  );
}
