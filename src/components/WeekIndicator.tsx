"use client";

// === WEEK INDICATOR ===
// Shows "Week 5 of 14 — Flows, Data Models & Node.js"
// Tells the user where they are in the curriculum at a glance.

import { useProgressContext } from "@/hooks/useProgress";
import { getCurrentWeek, getWeekGroup, snapToMonday, TOTAL_WEEKS } from "@/lib/dates";

export default function WeekIndicator() {
  const { progress, isLoaded } = useProgressContext();

  if (!isLoaded) {
    return <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />;
  }

  const startMonday = snapToMonday(new Date(progress.startDate + "T00:00:00"));
  const currentWeek = getCurrentWeek(startMonday);

  // Before curriculum starts
  if (currentWeek < 0) {
    return (
      <div className="text-gray-500 text-lg">
        Your curriculum hasn&apos;t started yet. It begins on{" "}
        <span className="font-semibold text-gray-900">
          {startMonday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
      </div>
    );
  }

  // After curriculum ends
  if (currentWeek >= TOTAL_WEEKS) {
    return (
      <div className="text-lg">
        <span className="text-green-600 font-semibold">Curriculum complete!</span>{" "}
        <span className="text-gray-500">You finished all 14 weeks.</span>
      </div>
    );
  }

  // During curriculum
  const weekGroup = getWeekGroup(currentWeek);
  return (
    <div>
      <span className="text-2xl font-bold text-gray-900">
        Week {currentWeek + 1}
      </span>
      <span className="text-2xl text-gray-400"> of {TOTAL_WEEKS}</span>
      {weekGroup && (
        <p className="text-gray-500 mt-0.5">{weekGroup.title}</p>
      )}
    </div>
  );
}
