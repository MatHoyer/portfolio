import type { Repository } from "./types";
import {
  C,
  Cplusplus,
  Docker,
  Go,
  JavaScript,
  Python,
  TypeScript,
  type TIconProps,
} from "@/components/language/icons";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<TIconProps>> = {
  javascript: JavaScript,
  typescript: TypeScript,
  "c++": Cplusplus,
  c: C,
  python: Python,
  dockerfile: Docker,
  go: Go,
};

/** Map display shortcuts (TS, JS) and slugs to icon lookup keys */
export function normalizeLanguageKey(name: string): string {
  const lower = name.toLowerCase();
  if (lower === "ts") return "typescript";
  if (lower === "js") return "javascript";
  if (lower === "golang") return "go";
  return lower;
}

/** URL-safe slug for hrefs and display — not for route params or static paths. */
export function languageToSlug(name: string): string {
  return encodeURIComponent(normalizeLanguageKey(name));
}

export function slugToLanguage(slug: string): string {
  return normalizeLanguageKey(decodeURIComponent(slug));
}

export function getLanguageIconComponent(
  name: string,
): ComponentType<TIconProps> | null {
  return ICON_MAP[normalizeLanguageKey(name)] ?? null;
}

export function formatLanguageLabel(name: string): string {
  const key = normalizeLanguageKey(name);
  if (key === "typescript") return "TypeScript";
  if (key === "javascript") return "JavaScript";
  if (key === "c++") return "C++";
  if (key === "c") return "C";
  if (key === "go") return "Go";
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function collectRepoLanguages(repositories: Repository[]): string[] {
  return [
    ...new Set(
      repositories.flatMap((r) => r.languages.map((l) => normalizeLanguageKey(l.name))),
    ),
  ].sort((a, b) => formatLanguageLabel(a).localeCompare(formatLanguageLabel(b)));
}

export function filterReposByLanguage(
  repositories: Repository[],
  language: string | null,
): Repository[] {
  if (!language) return repositories;
  const key = normalizeLanguageKey(language);
  return repositories.filter((repo) =>
    repo.languages.some((l) => normalizeLanguageKey(l.name) === key),
  );
}

export function repoHasLanguage(repo: Repository, language: string): boolean {
  const key = normalizeLanguageKey(language);
  return repo.languages.some((l) => normalizeLanguageKey(l.name) === key);
}
