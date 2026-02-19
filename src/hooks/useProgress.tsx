"use client";

// === PROGRESS HOOK & CONTEXT PROVIDER ===
// Wraps localStorage operations in a React-friendly way.
// Handles the SSR hydration gap (localStorage doesn't exist on the server).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ProgressData } from "@/lib/types";
import {
  defaultProgress,
  loadProgress,
  saveProgress,
  taskKey,
} from "@/lib/progress";
import { TOTAL_DAYS } from "@/lib/dates";

// The shape of everything the hook returns
interface ProgressContextValue {
  progress: ProgressData;         // The raw progress data
  isLoaded: boolean;              // False until localStorage is read (avoids SSR mismatch)
  toggleTask: (weekIndex: number, dayIndex: number) => void;  // Check/uncheck a day
  isTaskComplete: (weekIndex: number, dayIndex: number) => boolean;
  setStartDate: (date: string) => void;  // Update the curriculum start date
  completedCount: number;         // How many days are checked off
  totalTasks: number;             // Always 98 (14 weeks × 7 days)
  percentComplete: number;        // 0–100
  updateProgress: (data: ProgressData) => void;  // For JSON import
}

// Create the context (null until provider mounts)
const ProgressContext = createContext<ProgressContextValue | null>(null);

/**
 * Hook that manages all progress state.
 * Used internally by the provider — components should use useProgressContext() instead.
 */
function useProgressState(): ProgressContextValue {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage once on the client
  useEffect(() => {
    setProgress(loadProgress());
    setIsLoaded(true);
  }, []);

  // Toggle a task's completion status
  const toggleTask = useCallback(
    (weekIndex: number, dayIndex: number) => {
      const key = taskKey(weekIndex, dayIndex);
      const updated: ProgressData = {
        ...progress,
        completedTasks: {
          ...progress.completedTasks,
          [key]: !progress.completedTasks[key],
        },
      };
      saveProgress(updated);
      setProgress(updated);
    },
    [progress]
  );

  // Check if a specific task is complete
  const isTaskComplete = useCallback(
    (weekIndex: number, dayIndex: number) => {
      return !!progress.completedTasks[taskKey(weekIndex, dayIndex)];
    },
    [progress]
  );

  // Update the start date
  const setStartDate = useCallback(
    (date: string) => {
      const updated: ProgressData = { ...progress, startDate: date };
      saveProgress(updated);
      setProgress(updated);
    },
    [progress]
  );

  // Replace entire progress (used when importing JSON)
  const updateProgress = useCallback((data: ProgressData) => {
    saveProgress(data);
    setProgress(data);
  }, []);

  // Calculate completion stats
  const completedCount = Object.values(progress.completedTasks).filter(Boolean).length;
  const totalTasks = TOTAL_DAYS;
  const percentComplete = Math.round((completedCount / totalTasks) * 100);

  return {
    progress,
    isLoaded,
    toggleTask,
    isTaskComplete,
    setStartDate,
    completedCount,
    totalTasks,
    percentComplete,
    updateProgress,
  };
}

// === PROVIDER COMPONENT ===
// Wrap the app in this so all components share the same progress state.
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const value = useProgressState();
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// === CONSUMER HOOK ===
// Use this in any component that needs progress data.
export function useProgressContext(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgressContext must be used inside <ProgressProvider>");
  }
  return ctx;
}
