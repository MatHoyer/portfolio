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
        <CollapsibleTrigger className="flex w-full items-center gap-3 border-b border-swagger-border px-4 py-3 text-left hover:bg-swagger-surface-muted">
          <MethodBadge method={method} />
          <span className="font-mono text-sm font-semibold text-swagger-text">{path}</span>
          {summary && (
            <span className="ml-auto hidden text-sm text-swagger-muted sm:inline">
              {summary}
            </span>
          )}
          <ChevronDown
            className={cn(
              "ml-auto size-4 shrink-0 text-swagger-muted transition-transform",
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
