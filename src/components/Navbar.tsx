"use client";

// === TOP NAVIGATION BAR ===
// Sticky nav with links to Dashboard and Calendar.
// Also contains the settings gear icon for start date + export/import.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import StartDatePicker from "./StartDatePicker";
import DataPortButtons from "./DataPortButtons";

export default function Navbar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Helper to highlight the active link
  const linkClass = (path: string) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-gray-900";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo / title */}
          <Link href="/" className="text-lg font-bold text-gray-900">
            Learning Dashboard
          </Link>

          {/* Center: Nav links */}
          <div className="flex items-center gap-6">
            <Link href="/" className={linkClass("/")}>
              Dashboard
            </Link>
            <Link href="/calendar" className={linkClass("/calendar")}>
              Calendar
            </Link>
          </div>

          {/* Right: Settings toggle */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="Settings"
          >
            {/* Simple gear icon (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Settings panel (slides open below nav) */}
        {settingsOpen && (
          <div className="border-t border-gray-100 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <StartDatePicker />
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <DataPortButtons />
          </div>
        )}
      </div>
    </nav>
  );
}
