"use client";

// === PROGRESS HOOK & CONTEXT PROVIDER ===
// Wraps localStorage operations in a React-friendly way.
// Handles the SSR hydration gap (localStorage doesn't exist on the server).
//
// This hook is also where curriculum switching lives. The dashboard supports
// multiple, mutually exclusive curricula (see src/data/curricula.ts) — each
// one has its own progress, stored under its own localStorage key. Switching
// curricula means: remember which one is active, then load ITS progress
// (never mixing it with another curriculum's data).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Curriculum, ProgressData } from "@/lib/types";
import {
  defaultProgress,
  loadActiveCurriculumId,
  loadProgress,
  saveActiveCurriculumId,
  saveProgress,
  taskKey,
} from "@/lib/progress";
import { DEFAULT_CURRICULUM_ID, getCurriculumById } from "@/data/curricula";

// The shape of everything the hook returns
interface ProgressContextValue {
  progress: ProgressData;         // The raw progress data
  isLoaded: boolean;              // False until localStorage is read (avoids SSR mismatch)
  toggleTask: (weekIndex: number, dayIndex: number) => void;  // Check/uncheck a day
  isTaskComplete: (weekIndex: number, dayIndex: number) => boolean;
  setStartDate: (date: string) => void;  // Update the curriculum start date
  completedCount: number;         // How many days are checked off
  totalTasks: number;             // activeCurriculum.totalWeeks * 7
  percentComplete: number;        // 0–100
  updateProgress: (data: ProgressData) => void;  // For JSON import
  activeCurriculum: Curriculum;   // The full curriculum object currently active
  activeCurriculumId: string;     // Its id, e.g. "ai-product-builder"
  switchCurriculum: (id: string) => void;  // Tab between curricula
}

// Create the context (null until provider mounts)
const ProgressContext = createContext<ProgressContextValue | null>(null);

/**
 * Hook that manages all progress state.
 * Used internally by the provider — components should use useProgressContext() instead.
 */
function useProgressState(): ProgressContextValue {
  const [activeCurriculumId, setActiveCurriculumId] = useState(DEFAULT_CURRICULUM_ID);
  const [progress, setProgress] = useState<ProgressData>(defaultProgress());
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount, figure out which curriculum was active last time, then load
  // that curriculum's own progress. This runs once on the client.
  //
  // The lint rule below normally warns about setState inside an effect, but
  // this is the standard pattern for browser-only data like localStorage:
  // the server render can't see it, so the first client render uses defaults
  // and this effect syncs in the real data right after mount.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const id = loadActiveCurriculumId();
    setActiveCurriculumId(id);
    setProgress(loadProgress(id));
    setIsLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // The full curriculum object (week groups, length, etc.) for whichever
  // id is currently active. getCurriculumById defends against a bad/stale id.
  const activeCurriculum = getCurriculumById(activeCurriculumId);

  // Switch to a different curriculum: save the choice, then load that
  // curriculum's own progress. Each curriculum's progress is fully
  // independent — this never mixes data between them.
  const switchCurriculum = useCallback((id: string) => {
    // Normalize through getCurriculumById so a bad id can't get stored
    const resolved = getCurriculumById(id);
    saveActiveCurriculumId(resolved.id);
    setActiveCurriculumId(resolved.id);
    setProgress(loadProgress(resolved.id));
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
      saveProgress(activeCurriculumId, updated);
      setProgress(updated);
    },
    [progress, activeCurriculumId]
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
      saveProgress(activeCurriculumId, updated);
      setProgress(updated);
    },
    [progress, activeCurriculumId]
  );

  // Replace entire progress (used when importing JSON)
  const updateProgress = useCallback(
    (data: ProgressData) => {
      saveProgress(activeCurriculumId, data);
      setProgress(data);
    },
    [activeCurriculumId]
  );

  // Calculate completion stats — total tasks depends on the active
  // curriculum's length (e.g. 14 weeks vs. 12 weeks × 7 days each)
  const completedCount = Object.values(progress.completedTasks).filter(Boolean).length;
  const totalTasks = activeCurriculum.totalWeeks * 7;
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
    activeCurriculum,
    activeCurriculumId,
    switchCurriculum,
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
