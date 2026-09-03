// === PROGRESS PERSISTENCE ===
// Handles reading/writing task completion to localStorage,
// plus JSON export/import for backup and portability.
//
// Each curriculum gets its own progress, stored under its own localStorage
// key, so switching curricula never mixes their data together. See
// src/data/curricula.ts for the list of curricula and src/hooks/useProgress.tsx
// for how the active curriculum is tracked.

import type { ProgressData } from "@/lib/types";
import { DEFAULT_CURRICULUM_ID } from "@/data/curricula";

// The original single-curriculum storage key, from before multi-curriculum
// support existed. We keep reading this as a one-time migration source (see
// loadProgress below) but never write to it again — it stays as a backup.
const LEGACY_STORAGE_KEY = "learning-dashboard-progress";

// Which curriculum is currently active (tab the user last had open).
const ACTIVE_CURRICULUM_KEY = "learning-dashboard-active-curriculum";

/**
 * Build the localStorage key for a specific curriculum's progress.
 * Each curriculum gets its own namespaced key, e.g.
 * "learning-dashboard-progress:healthcare-systems".
 */
function progressStorageKey(curriculumId: string): string {
  return `learning-dashboard-progress:${curriculumId}`;
}

/**
 * Create a default (empty) progress object.
 * Start date defaults to today.
 */
export function defaultProgress(): ProgressData {
  return {
    startDate: new Date().toISOString().split("T")[0], // "2026-02-18"
    completedTasks: {},
    lastUpdated: new Date().toISOString(),
    calendarMode: "strict-sequential",
  };
}

/**
 * Generate a storage key for a specific day.
 * Format: "w{weekIndex}d{dayIndex}" — e.g., "w3d2" = Week 3, Wednesday
 */
export function taskKey(weekIndex: number, dayIndex: number): string {
  return `w${weekIndex}d${dayIndex}`;
}

/**
 * Load progress for a specific curriculum from localStorage.
 * Returns default progress if nothing is saved or if running on the server.
 *
 * ONE-TIME MIGRATION: the app used to support only a single curriculum,
 * stored under LEGACY_STORAGE_KEY. If we're loading the default curriculum
 * and its new per-curriculum key is empty, but the legacy key has data,
 * we copy that legacy data over to the new key. The legacy key is left in
 * place afterward as a backup — we never delete it.
 */
export function loadProgress(curriculumId: string): ProgressData {
  if (typeof window === "undefined") return defaultProgress();

  const key = progressStorageKey(curriculumId);
  const raw = localStorage.getItem(key);

  if (!raw) {
    // Nothing saved yet under the per-curriculum key.
    // If this is the default curriculum, check for legacy data to migrate.
    if (curriculumId === DEFAULT_CURRICULUM_ID) {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        try {
          const legacyData = JSON.parse(legacyRaw) as ProgressData;
          // Copy legacy data into the new per-curriculum key.
          // We leave LEGACY_STORAGE_KEY untouched as a backup.
          localStorage.setItem(key, JSON.stringify(legacyData));
          return legacyData;
        } catch {
          // Legacy data was corrupted — fall through to default.
        }
      }
    }
    return defaultProgress();
  }

  try {
    return JSON.parse(raw) as ProgressData;
  } catch {
    return defaultProgress();
  }
}

/**
 * Save progress for a specific curriculum to localStorage.
 * Automatically updates the lastUpdated timestamp and stamps the
 * curriculumId onto the data so we always know which curriculum it's for.
 */
export function saveProgress(curriculumId: string, data: ProgressData): void {
  if (typeof window === "undefined") return;
  data.lastUpdated = new Date().toISOString();
  data.curriculumId = curriculumId;
  localStorage.setItem(progressStorageKey(curriculumId), JSON.stringify(data));
}

/**
 * Load which curriculum is currently active (the tab the user last had open).
 * Returns DEFAULT_CURRICULUM_ID on the server or when nothing has been set yet.
 */
export function loadActiveCurriculumId(): string {
  if (typeof window === "undefined") return DEFAULT_CURRICULUM_ID;
  return localStorage.getItem(ACTIVE_CURRICULUM_KEY) ?? DEFAULT_CURRICULUM_ID;
}

/**
 * Save which curriculum is currently active, so the same tab reopens
 * next time the user visits.
 */
export function saveActiveCurriculumId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_CURRICULUM_KEY, id);
}

/**
 * Export progress as a downloadable JSON file.
 * Creates a temporary <a> tag and clicks it to trigger the download.
 */
export function exportToJSON(data: ProgressData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // Filename includes the curriculum and today's date for easy identification
  const date = new Date().toISOString().split("T")[0];
  a.download = `learning-progress-${data.curriculumId ?? "unknown"}-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import progress from a JSON file.
 * Validates the file shape, saves it under the right curriculum's key, and
 * returns the data.
 *
 * The file may have been exported from a different curriculum than the one
 * currently active — so we trust data.curriculumId if it's present, and
 * only fall back to fallbackCurriculumId (the currently active curriculum)
 * if the file doesn't say. Either way, we stamp the resolved curriculumId
 * back onto the data before saving, so it's never ambiguous afterward.
 *
 * Throws an error if the file format is invalid.
 */
export function importFromJSON(
  file: File,
  fallbackCurriculumId: string
): Promise<ProgressData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Basic validation: must have startDate and completedTasks
        if (!data.startDate || typeof data.completedTasks !== "object") {
          throw new Error("Invalid progress file format");
        }
        // Figure out which curriculum this data belongs to
        const targetCurriculumId = data.curriculumId ?? fallbackCurriculumId;
        data.curriculumId = targetCurriculumId;
        saveProgress(targetCurriculumId, data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
