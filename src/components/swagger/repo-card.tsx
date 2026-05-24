"use client";

import type { Repository } from "@/lib/types";
import { LanguageLabel } from "@/components/language/language-label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function RepoCard({ repo }: { repo: Repository }) {
  const t = useTranslations("common");

  return (
    <Link href={`/repos/${repo.name}`}>
      <Card className="h-full border-swagger-border bg-swagger-surface shadow-sm transition-shadow hover:border-[var(--swagger-get)] hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-base text-[var(--swagger-get)]">
            {repo.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-swagger-muted">
            {repo.description ?? t("noDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2 text-xs text-swagger-muted">
            <span>★ {repo.stargazerCount}</span>
            <span>⑂ {repo.forkCount}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {repo.languages.slice(0, 3).map((lang) => (
              <Badge
                key={lang.name}
                variant="outline"
                className="border-swagger-border py-1 font-mono text-[10px] text-[var(--swagger-post)]"
              >
                <LanguageLabel
                  name={lang.name}
                  percentage={lang.percentage}
                  iconSize={14}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
