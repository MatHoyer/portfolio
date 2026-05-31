"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { MethodBadge, type HttpMethod } from "./method-badge";

export function OperationBlock({
  method,
  path,
  summary,
  children,
  defaultOpen = true,
}: {
  method: HttpMethod;
  path: string;
  summary?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="overflow-hidden rounded border border-swagger-border bg-swagger-surface shadow-sm">
        <CollapsibleTrigger className="flex w-full min-w-0 items-center gap-2 border-b border-swagger-border px-4 py-3 text-left hover:bg-swagger-surface-muted sm:gap-3">
          <MethodBadge method={method} className="shrink-0" />
          <span className="min-w-0 truncate font-mono text-sm font-semibold text-swagger-text">
            {path}
          </span>
          {summary && (
            <span className="hidden shrink-0 text-sm text-swagger-muted sm:ml-auto sm:inline">
              {summary}
            </span>
          )}
          <ChevronDown
            className={cn(
              "ms-auto size-4 shrink-0 text-swagger-muted transition-transform",
              open && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-swagger-surface-muted p-4">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
