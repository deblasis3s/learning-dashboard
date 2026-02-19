// === DATE & CALENDAR MATH ===
// All the functions that power the calendar view and "today" detection.
// Week 0 starts on the user's chosen start date (snapped to Monday).
// 14 weeks total (0-13), 7 days each = 98 days.

import { weekGroups } from "@/data/curriculum";
import type { DayPlan, WeekGroup } from "@/lib/types";

// Day-of-week labels matching our 0-6 index (Mon=0, Sun=6)
export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Total weeks in the curriculum
export const TOTAL_WEEKS = 14;
export const TOTAL_DAYS = TOTAL_WEEKS * 7; // 98

/**
 * Snap a date to the Monday of that week.
 * If the date is already a Monday, return it unchanged.
 * JS getDay(): 0=Sun, 1=Mon, 2=Tue, ... 6=Sat
 */
export function snapToMonday(date: Date): Date {
  const d = new Date(date);
  const jsDay = d.getDay(); // 0=Sun, 1=Mon...
  // How many days back to get to Monday
  const daysBack = jsDay === 0 ? 6 : jsDay - 1;
  d.setDate(d.getDate() - daysBack);
  // Zero out the time portion so comparisons are clean
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the actual calendar date for a given week and day index.
 * weekIndex: 0-13, dayIndex: 0-6 (Mon-Sun)
 */
export function getDateForDay(startMonday: Date, weekIndex: number, dayIndex: number): Date {
  const d = new Date(startMonday);
  d.setDate(d.getDate() + weekIndex * 7 + dayIndex);
  return d;
}

/**
 * Get the current week number (0-based) based on the start date.
 * Returns -1 if before start, or a number >= TOTAL_WEEKS if curriculum is over.
 */
export function getCurrentWeek(startMonday: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now.getTime() - startMonday.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return -1; // Before curriculum starts
  return Math.floor(diffDays / 7);
}

/**
 * Get today's day index (0=Mon, 6=Sun).
 * Uses local timezone.
 */
export function getTodayDayIndex(): number {
  const jsDay = new Date().getDay(); // 0=Sun, 1=Mon...
  return jsDay === 0 ? 6 : jsDay - 1;
}

/**
 * Find which WeekGroup a given week number belongs to.
 * E.g., week 9 belongs to the "weeks-8-10" group.
 */
export function getWeekGroup(weekIndex: number): WeekGroup | undefined {
  return weekGroups.find((wg) => wg.weekNumbers.includes(weekIndex));
}

/**
 * Get the DayPlan for a specific week and day.
 * Returns undefined if the week/day is out of range.
 */
export function getDayPlan(weekIndex: number, dayIndex: number): DayPlan | undefined {
  const group = getWeekGroup(weekIndex);
  if (!group) return undefined;
  return group.days[dayIndex];
}

/**
 * Format a date as "Mon, Feb 23" for display.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a date as "February 23, 2026" for longer display.
 */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Check if two dates are the same calendar day (ignoring time).
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Format a date as YYYY-MM-DD for the date input element.
 */
export function toInputDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
