"use client";

// === PROGRESS BAR ===
// Shows overall curriculum completion as a filled bar with percentage.
// Color transitions from gray (0%) through blue to green (100%).

import { useProgressContext } from "@/hooks/useProgress";

export default function ProgressBar() {
  const { completedCount, totalTasks, percentComplete, isLoaded } = useProgressContext();

  // Don't render real numbers until localStorage is loaded (avoids SSR mismatch)
  if (!isLoaded) {
    return (
      <div className="w-full">
        <div className="h-3 w-full rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  // Pick a color based on progress
  const barColor =
    percentComplete === 100
      ? "bg-green-500"
      : percentComplete >= 50
        ? "bg-blue-500"
        : "bg-blue-400";

  return (
    <div className="w-full">
      {/* Text label */}
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-medium text-gray-700">
          {completedCount} of {totalTasks} days completed
        </span>
        <span className="text-sm font-semibold text-gray-900">
          {percentComplete}%
        </span>
      </div>
      {/* Bar */}
      <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </div>
  );
}
