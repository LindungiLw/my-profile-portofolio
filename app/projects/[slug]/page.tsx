// app/projects/[slug]/page.tsx
"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

// Import semua layout kategori
import UiUxLayout from "./layouts/UiUxLayout";
import WebLayout from "./layouts/WebLayout";
import MobileLayout from "./layouts/MobileLayout";
import LicensesLayout from "./layouts/LicensesLayout";
import StandardLayout from "./layouts/StandardLayout"; // Untuk jaga-jaga

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const p = projects.find((item) => item.slug === slug);

  if (!p) notFound();

  // Sistem Switcher berdasarkan kategori
  switch (p.category) {
    case "UI/UX":
      return <UiUxLayout p={p} />;
    case "Web":
      return <WebLayout p={p} />;
    case "Mobile":
      return <MobileLayout p={p} />;
    case "Licenses":
      return <LicensesLayout p={p} />;
    default:
      return <StandardLayout p={p} />;
  }
}
