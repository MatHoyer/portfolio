import { cn } from "@/lib/utils";

/** Page opener: endpoint tag, big title, optional lead text. */
export function PageHeader({
  tag,
  title,
  children,
  tagClassName,
}: {
  tag: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  tagClassName?: string;
}) {
  return (
    <header className="flex flex-col items-start">
      <span
        className={cn(
          "font-mono text-xs tracking-wide text-[var(--swagger-accent-text)]",
          tagClassName,
        )}
      >
        {tag}
      </span>
      <h1 className="mt-2 text-4xl leading-none font-extrabold tracking-tight text-balance text-swagger-text sm:text-5xl">
        {title}
      </h1>
      {children && <p className="mt-3 max-w-[60ch] text-lg text-swagger-muted">{children}</p>}
    </header>
  );
}
