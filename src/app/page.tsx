"use client";

// === DASHBOARD (HOME PAGE) ===
// The main landing page. Shows:
// 1. Week indicator — where you are in the curriculum
// 2. Progress bar — overall completion percentage
// 3. Today's task card — what to do right now

import WeekIndicator from "@/components/WeekIndicator";
import ProgressBar from "@/components/ProgressBar";
import TodayCard from "@/components/TodayCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top section: week number + progress */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <WeekIndicator />
      </div>

      <ProgressBar />

      {/* Today's task — the hero of the page */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          Today&apos;s Focus
        </h3>
        <TodayCard />
      </div>
    </div>
  );
}
