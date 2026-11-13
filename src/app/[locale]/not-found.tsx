import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col items-start gap-8">
      <PageHeader tag="404 Not Found" tagClassName="text-[var(--swagger-delete)]" title={t("title")}>
        {t("description")}
      </PageHeader>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "h-10 bg-[var(--swagger-topbar-accent)] px-4 font-mono font-bold text-[var(--swagger-topbar)] hover:opacity-90",
        )}
      >
        {t("home")}
      </Link>
    </div>
  );
}
