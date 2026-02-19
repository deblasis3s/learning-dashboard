"use client";

// === TODAY'S TASK CARD ===
// The hero component on the dashboard. Shows what to do today:
// focus area, time estimate, description, resource links, and a checkbox.

import Link from "next/link";
import { useProgressContext } from "@/hooks/useProgress";
import {
  getCurrentWeek,
  getDayPlan,
  getTodayDayIndex,
  getDateForDay,
  formatDateLong,
  snapToMonday,
  TOTAL_WEEKS,
  DAY_LABELS,
} from "@/lib/dates";
import FocusBadge from "./FocusBadge";

export default function TodayCard() {
  const { progress, isLoaded, toggleTask, isTaskComplete } = useProgressContext();

  if (!isLoaded) {
    return <div className="h-48 bg-white rounded-xl border border-gray-200 animate-pulse" />;
  }

  const startMonday = snapToMonday(new Date(progress.startDate + "T00:00:00"));
  const currentWeek = getCurrentWeek(startMonday);
  const todayDayIndex = getTodayDayIndex();

  // Before or after curriculum
  if (currentWeek < 0 || currentWeek >= TOTAL_WEEKS) {
    return null; // WeekIndicator already shows the appropriate message
  }

  const dayPlan = getDayPlan(currentWeek, todayDayIndex);
  if (!dayPlan) return null;

  const completed = isTaskComplete(currentWeek, todayDayIndex);
  const todayDate = getDateForDay(startMonday, currentWeek, todayDayIndex);

  return (
    <div className={`bg-white rounded-xl border-2 p-6 transition-colors ${completed ? "border-green-300 bg-green-50/30" : "border-gray-200"}`}>
      {/* Header: date + focus badge + time */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Today — {DAY_LABELS[todayDayIndex]}
          </h2>
          <p className="text-sm text-gray-500">{formatDateLong(todayDate)}</p>
        </div>
        <div className="flex items-center gap-2">
          <FocusBadge focus={dayPlan.focus} />
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {dayPlan.timeEstimate}
          </span>
        </div>
      </div>

      {/* Task with checkbox */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleTask(currentWeek, todayDayIndex)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
            completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-blue-500"
          }`}
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <p className={`text-gray-800 leading-relaxed ${completed ? "line-through text-gray-400" : ""}`}>
          {dayPlan.description}
        </p>
      </div>

      {/* Resource links */}
      {dayPlan.resourceLinks.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {dayPlan.resourceLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
            >
              {/* Small external link icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Link to full day detail */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <Link
          href={`/day/${currentWeek}/${todayDayIndex}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View full day details &rarr;
        </Link>
      </div>
    </div>
  );
}
