import type { Repository } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { formatLanguageLabel, languageColor } from "@/lib/languages";

export function RepoCard({ repo }: { repo: Repository }) {
  const languages = repo.languages.filter((lang) => lang.percentage > 0);

  return (
    <Link
      href={`/repos/${repo.name}`}
      className="group flex h-full flex-col gap-3 rounded-lg border border-swagger-border bg-swagger-surface p-4 transition-colors hover:border-[var(--swagger-topbar-accent)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="truncate font-mono text-[15px] font-semibold text-swagger-text group-hover:text-[var(--swagger-accent-text)]">
          {repo.name}
        </span>
        <span className="shrink-0 font-mono text-xs tabular-nums text-swagger-muted">
          ★ {repo.stargazerCount}
          {repo.forkCount > 0 && <> · ⑂ {repo.forkCount}</>}
        </span>
      </div>

      <p className="line-clamp-2 min-h-[2.8em] text-sm leading-[1.4] text-swagger-muted">
        {repo.description}
      </p>

      {languages.length > 0 && (
        <div className="mt-auto flex flex-col gap-2 border-t border-dashed border-swagger-border pt-3">
          <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
            {languages.map((lang) => (
              <span
                key={lang.name}
                className="h-full"
                style={{ flexGrow: lang.percentage, background: languageColor(lang.name) }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-swagger-muted">
            {languages.slice(0, 3).map((lang) => (
              <span key={lang.name} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ background: languageColor(lang.name) }}
                  aria-hidden
                />
                {formatLanguageLabel(lang.name)} {lang.percentage}%
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}
