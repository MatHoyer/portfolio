import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OperationBlock } from "@/components/swagger/operation-block";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col gap-8">
      <OperationBlock method="GET" path="/404" summary="Resource not found">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-lg text-[var(--swagger-delete)]">{t("title")}</p>
          <p className="text-swagger-muted">{t("description")}</p>
          <Link href="/" className="font-mono text-sm text-swagger-link hover:underline">
            {t("home")}
          </Link>
        </div>
      </OperationBlock>
    </div>
  );
}
