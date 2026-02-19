"use client";

// === CALENDAR PAGE ===
// Shows the full 14-week curriculum as a grid.
// Each day is color-coded by discipline and shows completion status.

import CalendarGrid from "@/components/CalendarGrid";
import ProgressBar from "@/components/ProgressBar";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500 mt-1">Your 14-week curriculum at a glance. Click any day for details.</p>
      </div>

      <ProgressBar />

      <CalendarGrid />
    </div>
  );
}
