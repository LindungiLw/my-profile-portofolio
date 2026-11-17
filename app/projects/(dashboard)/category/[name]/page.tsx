// app/projects/(dashboard)/category/[name]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, type ProjectCategory } from "@/data/projects";
import { CategoryGrid } from "./CategoryGrid";

const catMap: Record<string, ProjectCategory> = {
  "ui-ux": "UI/UX",
  web: "Web",
  mobile: "Mobile",
  licenses: "Licenses",
};

export function generateStaticParams() {
  return Object.keys(catMap).map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const category = catMap[name];
  if (!category) {
    return { title: "Projects" };
  }
  return {
    title: `${category} Projects`,
    description: `Explore ${category} projects and works by Rahma Lindungi Laowo.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const category = catMap[name];
  if (!category) notFound();

  const filtered = projects.filter((p) => p.category === category);
  return <CategoryGrid category={category} items={filtered} />;
}
