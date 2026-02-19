"use client";

// === START DATE PICKER ===
// Lets the user choose when their curriculum begins.
// Automatically snaps to Monday so week math stays clean.

import { useProgressContext } from "@/hooks/useProgress";
import { snapToMonday, toInputDateString } from "@/lib/dates";

export default function StartDatePicker() {
  const { progress, setStartDate, isLoaded } = useProgressContext();

  if (!isLoaded) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = new Date(e.target.value + "T00:00:00"); // Parse as local time
    const monday = snapToMonday(picked);
    setStartDate(toInputDateString(monday));
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="start-date" className="text-sm text-gray-600 whitespace-nowrap">
        Start date:
      </label>
      <input
        id="start-date"
        type="date"
        value={progress.startDate}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <span className="text-xs text-gray-400">(snaps to Monday)</span>
    </div>
  );
}
