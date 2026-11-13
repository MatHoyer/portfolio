import { cn } from "@/lib/utils";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-[var(--swagger-get)]/12 text-[var(--swagger-get)] ring-[var(--swagger-get)]/30",
  POST: "bg-[var(--swagger-post)]/12 text-[var(--swagger-post)] ring-[var(--swagger-post)]/30",
  PUT: "bg-[var(--swagger-put)]/12 text-[var(--swagger-put)] ring-[var(--swagger-put)]/30",
  DELETE: "bg-[var(--swagger-delete)]/12 text-[var(--swagger-delete)] ring-[var(--swagger-delete)]/30",
};

export function MethodBadge({
  method,
  className,
}: {
  method: HttpMethod;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-16 items-center justify-center rounded px-2 py-1 font-mono text-xs font-bold uppercase ring-1 ring-inset",
        methodStyles[method],
        className,
      )}
    >
      {method}
    </span>
  );
}
