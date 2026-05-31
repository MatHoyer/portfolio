import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

type FlagProps = {
  size?: number;
  className?: string;
};

function FlagFrame({
  size = 16,
  className,
  children,
}: FlagProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      width={size}
      height={Math.round(size * (16 / 24))}
      className={className}
      aria-hidden
    >
      <rect width="24" height="16" rx="1.5" fill="#e5e7eb" />
      {children}
    </svg>
  );
}

function EnFlag({ size, className }: FlagProps) {
  return (
    <FlagFrame size={size} className={className}>
      <rect width="24" height="16" rx="1.5" fill="#012169" />
      <path fill="#fff" d="M0 0l24 16V0H0zm24 0L0 16h24V0z" />
      <path fill="#C8102E" d="M10.5 0v16h3V0h-3zM0 6.5v3h24v-3H0z" />
      <path fill="#fff" d="M0 0l9 6H0V0zm24 0H15l9 6V0zM0 16l9-6H0v6zm24 0v-6h-9l9 6z" />
      <path fill="#C8102E" d="M0 0l10.5 7V0H0zm24 0H13.5v7L24 0zM0 16h10.5V9L0 16zm13.5 0H24L13.5 9v7z" />
    </FlagFrame>
  );
}

function FrFlag({ size, className }: FlagProps) {
  return (
    <FlagFrame size={size} className={className}>
      <rect x="0" y="0" width="8" height="16" fill="#002395" />
      <rect x="8" y="0" width="8" height="16" fill="#fff" />
      <rect x="16" y="0" width="8" height="16" fill="#ED2939" />
    </FlagFrame>
  );
}

export function LocaleFlag({
  locale,
  size = 16,
  className,
}: FlagProps & { locale: Locale }) {
  return locale === "fr" ? (
    <FrFlag size={size} className={className} />
  ) : (
    <EnFlag size={size} className={className} />
  );
}
