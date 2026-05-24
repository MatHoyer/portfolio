import { cn } from "@/lib/utils";

export function CodePanel({
  data,
  className,
}: {
  data: unknown;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded border border-swagger-border bg-[var(--swagger-code-bg)] p-4 font-mono text-sm text-[var(--swagger-code-text)]",
        className,
      )}
    >
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
