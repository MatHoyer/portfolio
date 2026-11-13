"use client";

import { LanguageSelect } from "@/components/language/language-select";
import { RepoCard } from "@/components/swagger/repo-card";
import { filterReposByLanguage } from "@/lib/languages";
import type { Repository } from "@/lib/types";
import { useTranslations } from "next-intl";

export function ReposContent({
  repositories,
  languages,
  currentLanguage,
}: {
  repositories: Repository[];
  languages: string[];
  currentLanguage: string | null;
}) {
  const t = useTranslations("repos");
  const filtered = filterReposByLanguage(repositories, currentLanguage);

  return (
    <div className="flex flex-col gap-5">
      <LanguageSelect languages={languages} currentLanguage={currentLanguage} />

      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-swagger-muted">{t("noReposForLanguage")}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
