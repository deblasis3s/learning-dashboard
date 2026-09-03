// === CURRICULUM REGISTRY ===
// This file is the single list of every curriculum the dashboard knows about.
// Each curriculum bundles its own week groups (the actual daily plans) with
// some display metadata (name, description, length). The dashboard lets the
// user tab between curricula — each one keeps its own progress and calendar,
// completely separate from the others (see src/lib/progress.ts).
//
// To add a new curriculum: build its week groups in src/data/, then add one
// more entry to the `curricula` array below.

import { weekGroups } from "./curriculum";
import { healthcareWeekGroups } from "./curriculum-healthcare";
import type { Curriculum } from "@/lib/types";

export const curricula: Curriculum[] = [
  {
    id: "ai-product-builder",
    name: "AI Product Builder",
    shortName: "AI Builder",
    description: "14 weeks across AI foundations, CS, design, and PM",
    totalWeeks: 14,
    weekGroups,
  },
  {
    id: "healthcare-systems",
    name: "Healthcare Systems & Payment",
    shortName: "Healthcare",
    description: "12 weeks of FHIR, quality measures, and value-based payment",
    totalWeeks: 12,
    weekGroups: healthcareWeekGroups,
  },
];

// Which curriculum is active when nothing has been chosen yet
// (fresh install, or localStorage has no active-curriculum entry).
export const DEFAULT_CURRICULUM_ID = "ai-product-builder";

/**
 * Find a curriculum by its id.
 * Falls back to the first curriculum in the list if the id doesn't match
 * anything — this is defensive: a stale or corrupted id sitting in
 * localStorage (e.g. from a removed curriculum) must never crash the app.
 */
export function getCurriculumById(id: string): Curriculum {
  return curricula.find((c) => c.id === id) ?? curricula[0];
}
