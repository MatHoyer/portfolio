"use client";

import { OperationBlock } from "@/components/swagger/operation-block";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const STATUS_KEYS = [
  "statusConnecting",
  "statusFetching",
  "statusParsing",
] as const;

const CYCLE_MS = 1200;

export function TerminalLoader({
  path = "/",
  className,
}: {
  path?: string;
  className?: string;
}) {
  const t = useTranslations("loader");
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_KEYS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const statusKey = STATUS_KEYS[statusIndex];

  return (
    <div className={cn("flex flex-col", className)}>
    <OperationBlock
      method="GET"
      path={path}
      summary={t("summary")}
      defaultOpen
    >
      <div className="overflow-hidden rounded border border-swagger-border shadow-sm">
        <div className="flex items-center gap-2 border-b border-swagger-border bg-[var(--terminal-titlebar)] px-3 py-2">
          <span
            className="size-3 rounded-full bg-[var(--terminal-dot-red)]"
            aria-hidden
          />
          <span
            className="size-3 rounded-full bg-[var(--terminal-dot-yellow)]"
            aria-hidden
          />
          <span
            className="size-3 rounded-full bg-[var(--terminal-dot-green)]"
            aria-hidden
          />
          <span className="ml-2 font-mono text-xs text-[var(--terminal-titlebar-text)]">
            {t("windowTitle")}
          </span>
        </div>
        <pre className="min-h-[8rem] overflow-x-auto bg-[var(--swagger-code-bg)] p-4 font-mono text-sm text-[var(--swagger-code-text)]">
          <code className="block">
            <span className="text-[var(--terminal-prompt)]">$ </span>
            <span>curl -X GET {path}</span>
            {"\n"}
            <span className="text-swagger-muted">{t(statusKey)}</span>
            <span
              className="ml-0.5 text-[var(--terminal-cursor)] animate-terminal-blink"
              aria-hidden
            >
              ▌
            </span>
          </code>
        </pre>
      </div>
    </OperationBlock>
    </div>
  );
}
