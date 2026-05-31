"use client";

import { useId, type ReactNode } from "react";
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
  const clipId = `en-flag-${useId().replace(/:/g, "")}`;
  const stripeH = 16 / 7;
  return (
    <FlagFrame size={size} className={className}>
      <clipPath id={clipId}>
        <rect width="24" height="16" rx="1.5" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: 7 }, (_, i) => (
          <rect
            key={i}
            y={i * stripeH}
            width="24"
            height={stripeH + 0.5}
            fill={i % 2 === 0 ? "#B22234" : "#fff"}
          />
        ))}
        <rect width="9.6" height="8.2" fill="#3C3B6E" />
        {[
          [1.4, 1.2],
          [3.6, 1.2],
          [5.8, 1.2],
          [8, 1.2],
          [2.5, 2.8],
          [4.7, 2.8],
          [6.9, 2.8],
          [1.4, 4.4],
          [3.6, 4.4],
          [5.8, 4.4],
          [8, 4.4],
          [2.5, 6],
          [4.7, 6],
          [6.9, 6],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.55" fill="#fff" />
        ))}
      </g>
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
