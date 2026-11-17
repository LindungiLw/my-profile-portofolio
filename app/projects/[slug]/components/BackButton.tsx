// app/projects/[slug]/components/BackButton.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface BackButtonProps {
  labelSuffix?: string;
  fallbackHref?: string;
  className?: string;
}

export function BackButton({
  labelSuffix,
  fallbackHref = "/projects",
  className = "text-primary",
}: BackButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`mb-10 inline-flex items-center gap-1.5 hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0 transition-transform hover:-translate-x-1 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded ${className}`}
    >
      <span>←</span>
      <span>{t("caseStudy.back")}</span>
      {labelSuffix ? <span>({labelSuffix})</span> : null}
    </button>
  );
}
