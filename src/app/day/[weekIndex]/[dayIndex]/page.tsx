"use client";

// === DAY DETAIL PAGE ===
// Shows the full plan for a specific day: focus area, time, description,
// resource links, and a completion checkbox. Also has prev/next navigation.

import { useParams } from "next/navigation";
import Link from "next/link";
import { useProgressContext } from "@/hooks/useProgress";
import {
  getDayPlan,
  getDateForDay,
  getWeekGroup,
  formatDateLong,
  snapToMonday,
  TOTAL_WEEKS,
  DAY_LABELS,
} from "@/lib/dates";
import FocusBadge from "@/components/FocusBadge";

export default function DayDetailPage() {
  const params = useParams();
  const { progress, isLoaded, toggleTask, isTaskComplete } = useProgressContext();

  // Parse route params
  const weekIndex = Number(params.weekIndex);
  const dayIndex = Number(params.dayIndex);

  // Validate params
  if (
    isNaN(weekIndex) || isNaN(dayIndex) ||
    weekIndex < 0 || weekIndex >= TOTAL_WEEKS ||
    dayIndex < 0 || dayIndex > 6
  ) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Day not found</h1>
        <p className="text-gray-500 mt-2">This day doesn&apos;t exist in the curriculum.</p>
        <Link href="/calendar" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          &larr; Back to calendar
        </Link>
      </div>
    );
  }

  const dayPlan = getDayPlan(weekIndex, dayIndex);
  const weekGroup = getWeekGroup(weekIndex);

  if (!dayPlan || !weekGroup) return null;

  const startMonday = isLoaded
    ? snapToMonday(new Date(progress.startDate + "T00:00:00"))
    : new Date();
  const dayDate = getDateForDay(startMonday, weekIndex, dayIndex);
  const completed = isLoaded && isTaskComplete(weekIndex, dayIndex);

  // Calculate prev/next day links
  const prevWeek = dayIndex === 0 ? weekIndex - 1 : weekIndex;
  const prevDay = dayIndex === 0 ? 6 : dayIndex - 1;
  const hasPrev = prevWeek >= 0;

  const nextWeek = dayIndex === 6 ? weekIndex + 1 : weekIndex;
  const nextDay = dayIndex === 6 ? 0 : dayIndex + 1;
  const hasNext = nextWeek < TOTAL_WEEKS;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/calendar" className="hover:text-gray-700">Calendar</Link>
        <span>/</span>
        <span>Week {weekIndex + 1}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{DAY_LABELS[dayIndex]}</span>
      </div>

      {/* Day header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Week {weekIndex + 1}, {DAY_LABELS[dayIndex]}
            </h1>
            {isLoaded && (
              <p className="text-gray-500 mt-0.5">{formatDateLong(dayDate)}</p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">{weekGroup.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <FocusBadge focus={dayPlan.focus} />
            <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {dayPlan.timeEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* Task card */}
      <div className={`bg-white rounded-xl border-2 p-6 transition-colors ${completed ? "border-green-300 bg-green-50/30" : "border-gray-200"}`}>
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => toggleTask(weekIndex, dayIndex)}
            className={`mt-1 flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors ${
              completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-blue-500"
            }`}
            aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Description */}
          <div className="flex-1">
            <p className={`text-lg leading-relaxed ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
              {dayPlan.description}
            </p>
          </div>
        </div>

        {/* Resource links */}
        {dayPlan.resourceLinks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Resources
            </h3>
            <div className="space-y-2">
              {dayPlan.resourceLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors group"
                >
                  {/* Icon based on type */}
                  <span className="text-blue-500 group-hover:text-blue-700">
                    {link.type === "video" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                    {link.type === "course" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.547l1.606.688a3 3 0 002.388 0l1.606-.688v3.547a9.026 9.026 0 00-2.3 1.638 1 1 0 01-1.4 0z" />
                      </svg>
                    )}
                    {(link.type === "book") && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    )}
                    {(link.type === "article" || link.type === "docs") && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {(link.type === "tool" || link.type === "website") && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>

                  {/* Link text */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-blue-700 group-hover:text-blue-900">
                      {link.name}
                    </span>
                    <span className="text-xs text-blue-400 ml-2 capitalize">
                      {link.type}
                    </span>
                  </div>

                  {/* External arrow */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 group-hover:text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex justify-between mt-6">
        {hasPrev ? (
          <Link
            href={`/day/${prevWeek}/${prevDay}`}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Previous day
          </Link>
        ) : (
          <div />
        )}
        {hasNext ? (
          <Link
            href={`/day/${nextWeek}/${nextDay}`}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            Next day
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
