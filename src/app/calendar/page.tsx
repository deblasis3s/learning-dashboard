"use client";

// === CALENDAR PAGE ===
// Shows the full curriculum as a grid with all weeks and days.
// Each day is color-coded by discipline and shows completion status.

import { useProgressContext } from "@/hooks/useProgress";
import CalendarGrid from "@/components/CalendarGrid";
import ProgressBar from "@/components/ProgressBar";

export default function CalendarPage() {
  const { activeCurriculum } = useProgressContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar — {activeCurriculum.name}</h1>
        <p className="text-gray-500 mt-1">Your {activeCurriculum.totalWeeks}-week curriculum at a glance. Click any day for details.</p>
      </div>

      <ProgressBar />

      <CalendarGrid />
    </div>
  );
}
