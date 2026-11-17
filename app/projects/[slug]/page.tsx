// app/projects/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

import UiUxLayout from "./layouts/UiUxLayout";
import WebLayout from "./layouts/WebLayout";
import MobileLayout from "./layouts/MobileLayout";
import LicensesLayout from "./layouts/LicensesLayout";
import StandardLayout from "./layouts/StandardLayout";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((item) => item.slug === slug);
  if (!p) {
    return { title: "Project Not Found" };
  }
  return {
    title: p.title,
    description: p.shortDescription,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((item) => item.slug === slug);

  if (!p) notFound();

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
