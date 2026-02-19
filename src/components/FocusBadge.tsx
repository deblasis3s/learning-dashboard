"use client";

// === FOCUS BADGE ===
// A small colored pill that shows which discipline a task belongs to.
// Each FocusArea gets a unique color for quick visual scanning.

import type { FocusArea } from "@/lib/types";

// Map each focus area to its Tailwind color classes
const focusStyles: Record<FocusArea, { bg: string; text: string; border: string }> = {
  "AI Foundations": { bg: "bg-focus-ai-light", text: "text-focus-ai", border: "border-focus-ai" },
  CS:               { bg: "bg-focus-cs-light", text: "text-focus-cs", border: "border-focus-cs" },
  Design:           { bg: "bg-focus-design-light", text: "text-focus-design", border: "border-focus-design" },
  PM:               { bg: "bg-focus-pm-light", text: "text-focus-pm", border: "border-focus-pm" },
  Project:          { bg: "bg-focus-project-light", text: "text-focus-project", border: "border-focus-project" },
  Reading:          { bg: "bg-focus-reading-light", text: "text-focus-reading", border: "border-focus-reading" },
  "All Three":      { bg: "bg-focus-all-light", text: "text-focus-all", border: "border-focus-all" },
  Reflection:       { bg: "bg-focus-reflection-light", text: "text-focus-reflection", border: "border-focus-reflection" },
};

interface FocusBadgeProps {
  focus: FocusArea;
  size?: "sm" | "md"; // sm = calendar cells, md = day detail header
}

export default function FocusBadge({ focus, size = "md" }: FocusBadgeProps) {
  const styles = focusStyles[focus];
  const sizeClasses = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses}`}>
      {focus}
    </span>
  );
}

/**
 * Get just the border color class for a focus area.
 * Used by DayCell to color the left border without the full badge.
 */
export function getFocusBorderColor(focus: FocusArea): string {
  return focusStyles[focus].border;
}

/**
 * Get the background color class for a focus area.
 * Used by DayCell for subtle background tinting.
 */
export function getFocusBgColor(focus: FocusArea): string {
  return focusStyles[focus].bg;
}
