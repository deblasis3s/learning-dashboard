// === PROGRESS PERSISTENCE ===
// Handles reading/writing task completion to localStorage,
// plus JSON export/import for backup and portability.

import type { ProgressData } from "@/lib/types";

const STORAGE_KEY = "learning-dashboard-progress";

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
 * Load progress from localStorage.
 * Returns default progress if nothing is saved or if running on the server.
 */
export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultProgress();
  try {
    return JSON.parse(raw) as ProgressData;
  } catch {
    return defaultProgress();
  }
}

/**
 * Save progress to localStorage.
 * Automatically updates the lastUpdated timestamp.
 */
export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
  // Filename includes today's date for easy identification
  a.download = `learning-progress-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import progress from a JSON file.
 * Validates the file shape, saves to localStorage, and returns the data.
 * Throws an error if the file format is invalid.
 */
export function importFromJSON(file: File): Promise<ProgressData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Basic validation: must have startDate and completedTasks
        if (!data.startDate || typeof data.completedTasks !== "object") {
          throw new Error("Invalid progress file format");
        }
        saveProgress(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
