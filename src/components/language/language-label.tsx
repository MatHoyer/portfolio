import { formatLanguageLabel } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { LanguageIcon } from "./language-icon";

export function LanguageLabel({
  name,
  percentage,
  iconSize = 18,
  className,
}: {
  name: string;
  percentage?: number;
  iconSize?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <LanguageIcon name={name} size={iconSize} />
      <span className="font-mono text-inherit">
        {formatLanguageLabel(name)}
        {percentage !== undefined ? ` ${percentage}%` : ""}
      </span>
    </span>
  );
}
