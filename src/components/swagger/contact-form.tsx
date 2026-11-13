"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function ContactForm({ email }: { email: string }) {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const sendEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendEmail();
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="font-mono text-xs text-swagger-muted">
          {tCommon("subject")}
        </label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-10 border-swagger-border bg-swagger-bg font-mono"
          placeholder={tCommon("stringPlaceholder")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-body" className="font-mono text-xs text-swagger-muted">
          {tCommon("body")}
        </label>
        <Textarea
          id="contact-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-40 border-swagger-border bg-swagger-bg font-mono"
          placeholder={tCommon("stringPlaceholder")}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-10 w-fit bg-[var(--swagger-topbar-accent)] px-4 font-mono font-bold text-[var(--swagger-topbar)] hover:opacity-90"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
