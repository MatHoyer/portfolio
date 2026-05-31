import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/swagger/contact-form";
import { OperationBlock } from "@/components/swagger/operation-block";
import { getDeveloperData } from "@/lib/github";
import { localeAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates("/contact-me"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const { email } = await getDeveloperData();

  return (
    <div className="flex flex-col gap-8">
      <OperationBlock method="POST" path="/contact" summary={t("summary")}>
        <ContactForm email={email} />
      </OperationBlock>
    </div>
  );
}
