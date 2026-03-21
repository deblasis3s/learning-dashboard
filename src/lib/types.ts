// === CORE TYPES FOR THE LEARNING DASHBOARD ===

// The focus areas — each gets a unique color in the UI
export type FocusArea =
  | "AI Foundations"
  | "CS"
  | "Design"
  | "PM"
  | "Project"
  | "Reading"
  | "All Three"
  | "Reflection";

// The calendar modes - presets for dynamically adjusting curriculum
export type CalendarMode = 
  | "strict-sequential"   // Mode 1 — tasks shift based on completion
  | "catch-up"            // Mode 2 — dates fixed, backlog accumulates
  | "weekly-rollover"     // Mode 3 — week-level tracking with 2-week cap
  | "deadline-anchored"   // Mode 4 — user sets end date, tasks redistribute
  | "freeform";           // Mode 5 — no dates, task pool

// A clickable link to an external resource (embedded in a day's tasks)
export interface ResourceLink {
  name: string;    // Display name, e.g. "Codecademy - Learn JavaScript"
  url: string;     // Full URL
  type: "video" | "course" | "article" | "book" | "tool" | "docs" | "website";
}

// One day's plan from the weekly schedule
export interface DayPlan {
  dayOfWeek: string;               // "Mon", "Tue", etc.
  focus: FocusArea;                // Which discipline this day covers
  timeEstimate: string;            // "1.5 hr", "2 hr", etc.
  description: string;            // What to do that day
  resourceLinks: ResourceLink[];  // Clickable links relevant to this day
}

// A week group — covers 2-3 actual weeks that share the same daily template
export interface WeekGroup {
  id: string;            // "weeks-0-1", "weeks-2-3", etc.
  title: string;         // Human-readable title
  weekNumbers: number[]; // Which actual weeks (0-13) use this template
  days: DayPlan[];       // 7 days (Mon=0 through Sun=6)
}

// A resource from the master list (for the resources page/reference)
export interface Resource {
  name: string;
  type: string;      // "Video", "Book", "Course", etc.
  cost: string;      // "Free", "~$20", etc.
  whenToUse: string; // "Week 0 — visual explanation..."
  url: string;
  category: "ai" | "design" | "pm" | "cs";
}

// === PROGRESS / PERSISTENCE TYPES ===

// Stored in localStorage and exported/imported as JSON
export interface ProgressData {
  startDate: string;                       // ISO date string (e.g. "2026-02-23")
  completedTasks: Record<string, boolean>; // Keys like "w3d2" => true
  lastUpdated: string;                     // ISO timestamp
  calendarMode: CalendarMode;              
  endDate?: string;                        // ISO date — used by deadline-anchored mode only
  taskCompletionDates?: Record<string, string>; // task key → ISO date when completed
  weekRolloverCount?: Record<number, number>;   // weekIndex → rollover count
}
