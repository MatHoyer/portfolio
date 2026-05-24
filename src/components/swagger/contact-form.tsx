"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";

const EMAIL = "mathieuhoyer@gmail.com";

export function ContactForm() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const sendEmail = () => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-swagger-muted">
        {t("intro")}{" "}
        <a href={`mailto:${EMAIL}`} className="text-swagger-link hover:underline">
          {EMAIL}
        </a>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendEmail();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="font-mono text-sm font-semibold text-[var(--swagger-post)]">
            {tCommon("subject")}
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-swagger-border bg-swagger-surface font-mono"
            placeholder={tCommon("stringPlaceholder")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-sm font-semibold text-[var(--swagger-post)]">
            {tCommon("body")}
          </label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-24 border-swagger-border bg-swagger-surface font-mono"
            placeholder={tCommon("stringPlaceholder")}
          />
        </div>
        <Button
          type="submit"
          className="w-fit bg-[var(--swagger-post)] font-mono font-bold text-white hover:opacity-90"
        >
          {tCommon("execute")}
        </Button>
      </form>
    </div>
  );
}
