import { C, Cplusplus, Docker, Go, JavaScript, Python, TypeScript } from "@/components/language/icons";
import { normalizeLanguageKey } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";

function renderIcon(key: string, size: number) {
  const props = { width: size, height: size };
  switch (key) {
    case "javascript":
      return <JavaScript {...props} />;
    case "typescript":
      return <TypeScript {...props} />;
    case "c++":
      return <Cplusplus {...props} />;
    case "c":
      return <C {...props} />;
    case "python":
      return <Python {...props} />;
    case "dockerfile":
      return <Docker {...props} />;
    case "go":
      return <Go width={size} height={Math.round(size * (225 / 254.5))} />;
    default:
      return null;
  }
}

export function LanguageIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const key = normalizeLanguageKey(name);
  const svg = renderIcon(key, size);

  if (!svg) {
    return (
      <Code2
        className={cn("shrink-0 text-swagger-muted", className)}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    <span className={cn("inline-flex shrink-0", className)} aria-hidden>
      {svg}
    </span>
  );
}
