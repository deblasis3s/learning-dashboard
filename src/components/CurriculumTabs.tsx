"use client";

// === CURRICULUM TABS ===
// A segmented control component that lets the user switch between curricula.
// Each tab shows a curriculum's name, and clicking switches to it.
// The active tab displays the curriculum's one-liner description.

import { curricula } from "@/data/curricula";
import { useProgressContext } from "@/hooks/useProgress";

export default function CurriculumTabs() {
  const { activeCurriculumId, activeCurriculum, switchCurriculum, isLoaded } = useProgressContext();

  // While data is loading from localStorage, show a skeleton
  if (!isLoaded) {
    return <div className="h-10 w-72 bg-gray-200 rounded-xl animate-pulse" />;
  }

  return (
    <div>
      {/* Segmented control: one button per curriculum */}
      <div role="tablist" aria-label="Curriculum" className="inline-flex items-center gap-1 rounded-xl bg-gray-200/70 p-1">
        {curricula.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={c.id === activeCurriculumId}
            onClick={() => switchCurriculum(c.id)}
            className={
              c.id === activeCurriculumId
                ? "px-4 py-1.5 rounded-lg text-sm font-semibold bg-white text-gray-900 shadow-sm transition-colors"
                : "px-4 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            }
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* One-liner description of the active curriculum */}
      <p className="text-xs text-gray-500 mt-1.5">{activeCurriculum.description}</p>
    </div>
  );
}
