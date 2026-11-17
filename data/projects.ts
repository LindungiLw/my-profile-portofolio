// data/projects.ts

import { uiUxProjects } from "./projects_data/ui-ux";
import { webProjects } from "./projects_data/web";
import { mobileProjects } from "./projects_data/mobile";
import { licensesProjects } from "./projects_data/licenses";

export type ProjectCategory = "UI/UX" | "Web" | "Mobile" | "Licenses";

export interface Project {
  slug: string;
  overline: string;
  title: string;
  category: ProjectCategory;
  image: string;
  shortDescription: string;
  longDescription?: string;
  techStack?: string[];
  external?: string;
  github?: string;
  figma?: string;
  figmaEmbed?: string;
  challenges?: string;
  solutions?: string;
}

export const projects: Project[] = [
  ...uiUxProjects,
  ...webProjects,
  ...mobileProjects,
  ...licensesProjects,
];
