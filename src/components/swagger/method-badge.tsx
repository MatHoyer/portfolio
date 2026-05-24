import { cn } from "@/lib/utils";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-[#61affe] text-white",
  POST: "bg-[#49cc90] text-white",
  PUT: "bg-[#fca130] text-white",
  DELETE: "bg-[#f93e3e] text-white",
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
        "inline-flex min-w-16 items-center justify-center rounded px-2 py-1 font-mono text-xs font-bold uppercase",
        methodStyles[method],
        className,
      )}
    >
      {method}
    </span>
  );
}
