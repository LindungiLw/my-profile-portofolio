// data/projects.ts

import { uiUxProjects } from "./projects_data/ui-ux";
import { webProjects } from "./projects_data/web";
import { mobileProjects } from "./projects_data/mobile";
import { licensesProjects } from "./projects_data/licenses";

// 1. KITA BUAT "KTP" UNTUK PROYEK
// Tanda tanya (?) artinya data tersebut OPSIONAL (boleh ada, boleh tidak)
export interface Project {
  slug: string;
  overline: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  external?: string; // Opsional
  github?: string; // Opsional
  figma?: string; // Opsional
  figmaEmbed?: string; // Opsional
  challenges?: string; // Opsional
  solutions?: string; // Opsional
}

// 2. KITA GABUNGKAN DAN BERI LABEL "KTP" TERSEBUT (: Project[])
export const projects: Project[] = [
  ...uiUxProjects,
  ...webProjects,
  ...mobileProjects,
  ...licensesProjects,
];
