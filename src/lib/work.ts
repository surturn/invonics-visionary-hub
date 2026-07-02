import { WorkSolution } from "../types/content";

// Eagerly import every /work solution file. Same approach as lib/content.ts.
const workGlob = import.meta.glob("../content/work/*.ts", { eager: true });

export const getAllWorkSolutions = (): WorkSolution[] =>
  Object.values(workGlob)
    .map((module: any) => module.default as WorkSolution)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const getWorkBySlug = (slug: string): WorkSolution | undefined =>
  getAllWorkSolutions().find((item) => item.slug === slug);
