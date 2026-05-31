import { highlightJson } from "@/lib/shiki";
import { cn } from "@/lib/utils";

export async function CodePanel({
  data,
  className,
}: {
  data: unknown;
  className?: string;
}) {
  const html = await highlightJson(data);

  return (
    <div
      className={cn(
        "code-panel overflow-x-auto rounded border border-swagger-border bg-[var(--swagger-code-bg)] p-4 font-mono text-sm",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
