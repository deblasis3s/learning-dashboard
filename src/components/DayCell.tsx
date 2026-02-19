"use client";

// === DAY CELL ===
// A single cell in the calendar grid. Shows the day abbreviation,
// calendar date, focus area color, and a checkmark if completed.
// Highlighted if it's today. Clickable to navigate to the day detail.

import Link from "next/link";
import { useProgressContext } from "@/hooks/useProgress";
import { getDateForDay, isSameDay, snapToMonday } from "@/lib/dates";
import { getFocusBgColor } from "./FocusBadge";
import type { DayPlan } from "@/lib/types";

interface DayCellProps {
  weekIndex: number;
  dayIndex: number;
  dayPlan: DayPlan;
}

export default function DayCell({ weekIndex, dayIndex, dayPlan }: DayCellProps) {
  const { progress, isTaskComplete, isLoaded } = useProgressContext();

  const startMonday = snapToMonday(new Date(progress.startDate + "T00:00:00"));
  const cellDate = getDateForDay(startMonday, weekIndex, dayIndex);
  const isToday = isSameDay(cellDate, new Date());
  const completed = isLoaded && isTaskComplete(weekIndex, dayIndex);

  // Background tint from the focus area
  const bgColor = getFocusBgColor(dayPlan.focus);

  return (
    <Link
      href={`/day/${weekIndex}/${dayIndex}`}
      className={`
        block p-2 rounded-lg border transition-all hover:shadow-md
        ${isToday ? "ring-2 ring-blue-500 border-blue-300" : "border-gray-200"}
        ${completed ? "opacity-75" : ""}
        ${bgColor}
      `}
    >
      {/* Day label + check */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">
          {dayPlan.dayOfWeek}
        </span>
        {completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Calendar date */}
      <div className="text-lg font-semibold text-gray-900 mt-0.5">
        {cellDate.getDate()}
      </div>

      {/* Focus area label (truncated on small screens) */}
      <div className="text-xs text-gray-500 truncate mt-0.5">
        {dayPlan.focus}
      </div>

      {/* Time estimate */}
      <div className="text-xs text-gray-400 mt-0.5">
        {dayPlan.timeEstimate}
      </div>
    </Link>
  );
}
