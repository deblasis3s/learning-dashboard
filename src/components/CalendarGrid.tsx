"use client";

// === CALENDAR GRID ===
// Shows every week of the active curriculum as a grid.
// Each week is a row of 7 DayCells. On mobile, cells stack vertically for readability.

import { DAY_LABELS } from "@/lib/dates";
import { useProgressContext } from "@/hooks/useProgress";
import type { DayPlan } from "@/lib/types";
import DayCell from "./DayCell";

export default function CalendarGrid() {
  const { activeCurriculum } = useProgressContext();

  // Build a flat list of all weeks, each referencing its week group's days
  const allWeeks: { weekIndex: number; groupTitle: string; days: DayPlan[] }[] = [];

  for (let w = 0; w < activeCurriculum.totalWeeks; w++) {
    // Find which group this week belongs to
    const group = activeCurriculum.weekGroups.find((g) => g.weekNumbers.includes(w));
    if (group) {
      allWeeks.push({
        weekIndex: w,
        groupTitle: group.title,
        days: group.days,
      });
    }
  }

  return (
    <div className="space-y-3">
      {/* Column headers (day names) — visible on md+ */}
      <div className="hidden md:grid grid-cols-8 gap-2 px-1">
        <div /> {/* Empty space for the week label column */}
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-xs font-medium text-gray-400 text-center uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {allWeeks.map(({ weekIndex, groupTitle, days }) => (
        <div key={weekIndex} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-start">
          {/* Week label */}
          <div className="flex flex-col justify-center md:pr-2">
            <span className="text-sm font-semibold text-gray-700">
              Week {weekIndex + 1}
            </span>
            <span className="text-xs text-gray-400 truncate hidden md:block">
              {groupTitle}
            </span>
          </div>

          {/* 7 day cells */}
          {days.map((dayPlan, dayIndex) => (
            <DayCell
              key={dayIndex}
              weekIndex={weekIndex}
              dayIndex={dayIndex}
              dayPlan={dayPlan}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
