# PRD: Dynamic Calendar Modes
**Learning Dashboard — Feature Spec for Claude Code**
**Status:** Ready for implementation | **Priority:** High

---

## Goal

Replace the current fixed date-to-task mapping with a pluggable system of calendar modes. The user selects a mode that controls how task days are assigned to calendar dates, how missed days are handled, and how completion state affects future scheduling.

---

## Current Behavior (Baseline)

- `startDate` is stored in `ProgressData` (localStorage via `progress.ts`)
- `getDateForDay(startMonday, weekIndex, dayIndex)` in `dates.ts` computes task dates as pure math: `startMonday + weekIndex*7 + dayIndex`
- Completion state (`completedTasks`) has no effect on date assignment
- Tasks keyed as `w{weekIndex}d{dayIndex}` (e.g. `"w3d2"`)

---

## Data Model Changes

### 1. Add `CalendarMode` type to `src/lib/types.ts`

```ts
export type CalendarMode =
  | "strict-sequential"   // Mode 1 — tasks shift based on completion
  | "catch-up"            // Mode 2 — dates fixed, backlog accumulates
  | "weekly-rollover"     // Mode 3 — week-level tracking with 2-week cap
  | "deadline-anchored"   // Mode 4 — user sets end date, tasks redistribute
  | "freeform";           // Mode 5 — no dates, task pool
```

### 2. Extend `ProgressData` in `src/lib/types.ts`

```ts
export interface ProgressData {
  startDate: string;
  completedTasks: Record<string, boolean>;
  lastUpdated: string;
  // NEW
  calendarMode: CalendarMode;
  endDate?: string;                          // Used by deadline-anchored mode only
  taskCompletionDates?: Record<string, string>; // ISO date string per task key — used by strict-sequential to record WHEN each task was completed
  weekRolloverCount?: Record<number, number>; // weekIndex → number of times rolled — used by weekly-rollover
}
```

### 3. Update `defaultProgress()` in `src/lib/progress.ts`

Set default `calendarMode: "strict-sequential"` so new users start with the most responsive mode.

---

## Mode Specifications

---

### Mode 1 — Strict Sequential Rollover (`strict-sequential`)

**The default mode. Most responsive to real behavior.**

**Behavior:**
- Tasks form a sequential chain, one per calendar day, starting from `startDate`
- The assigned date for task at position N is computed dynamically:
  - Walk through tasks in order (0 → 97)
  - Maintain a `cursor` date starting at `startDate`
  - For each task: assign it to `cursor`, then advance cursor by 1 calendar day **only if the task is marked complete**
  - Result: completed tasks "close" their day and advance the cursor; incomplete tasks hold the cursor in place and everything behind them shifts forward

**Example:**
```
Start = March 3

Task 0 (Day A): incomplete → assigned March 3
Task 1 (Day B): incomplete → assigned March 4 (cursor hasn't moved past Day A yet)

User completes Day A on March 4:
Task 0: March 3 ✓ (locked to completion date)
Task 1: now March 4
Task 2: March 5 — back on track

User also completes Day B on March 4 (overachiever):
Task 0: March 3 ✓
Task 1: March 4 ✓
Task 2: March 5 — correctly back on track
```

**Unchecking:**
- Unchecking a task moves it back to "incomplete" and re-runs the assignment algorithm
- All subsequent task dates cascade accordingly
- Remove its entry from `taskCompletionDates` on uncheck

**Implementation notes:**
- Add a `getAssignedDates(progress: ProgressData): Record<string, Date>` function in `dates.ts` that runs the cursor algorithm and returns a map of `taskKey → assignedDate`
- Replace all calls to `getDateForDay()` in calendar rendering with a lookup into this map when mode is `strict-sequential`
- Record the actual calendar date in `taskCompletionDates[taskKey]` when a task is checked off

---

### Mode 2 — Catch-Up Accumulation (`catch-up`)

**Closest to current behavior. Dates are fixed; backlog piles up.**

**Behavior:**
- Dates are assigned exactly as today: `startMonday + weekIndex*7 + dayIndex` (no change to `getDateForDay`)
- Miss a day → that day's tasks remain visible on their original date AND also appear on "today" as backlog
- Today's view shows all incomplete tasks whose assigned date ≤ today, stacked together
- A backlog badge on the calendar header shows how many overdue task days are pending

**Implementation notes:**
- Minimal changes to date math — `getDateForDay` stays as-is
- Update the Today card and calendar day rendering to aggregate and display all overdue uncompleted tasks
- Add a `getBacklogCount(progress, startMonday)` helper in `dates.ts`

---

### Mode 3 — Weekly Rollover with Hard Cap (`weekly-rollover`)

**Week-level tracking. Forgiving but bounded.**

**Behavior:**
- Completion is tracked at the week level, not the day level
- A week is "complete" when all 7 of its task days are checked off
- If a week is not complete by the time the next week starts (based on `startDate`), its remaining tasks roll into the next week — that week now shows both its own tasks and the carried-over ones
- **Hard cap:** a week can only roll over a maximum of 2 times. After 2 rollovers, remaining uncompleted tasks for that week are marked `"skipped"` automatically and the curriculum advances
- Track rollover count in `weekRolloverCount[weekIndex]`

**Skipped state:**
- Add `"skipped"` as a valid value in `completedTasks` (currently boolean — either extend to `boolean | "skipped"` or use a separate `skippedTasks: Record<string, boolean>` field)
- Skipped tasks render with a distinct visual treatment (greyed out, strikethrough) distinct from completed tasks

**Implementation notes:**
- Add a `computeWeekRollovers(progress, today)` function that evaluates which weeks have exceeded their window and auto-marks remaining tasks as skipped
- Run this on load and after any task toggle

---

### Mode 4 — Deadline-Anchored (`deadline-anchored`)

**User commits to an end date. The calendar redistributes to fit.**

**Behavior:**
- User sets `endDate` in settings (required for this mode)
- System calculates total available calendar days between `startDate` and `endDate`
- 98 tasks are distributed evenly across available days — some days may have 2 tasks if the window is shorter than 98 days
- As tasks are completed early, remaining tasks redistribute across remaining days (spreading out)
- As tasks fall behind, remaining tasks compress (more per day)

**Guardrails:**
- Minimum window: 49 days (2 tasks/day max)
- If `endDate` is fewer than 49 days from `startDate`, warn the user and suggest a longer window
- Distribution respects weekly boundaries where possible (don't split a week group across drastically different dates)

**Implementation notes:**
- Add `computeDeadlineSchedule(progress): Record<string, Date>` in `dates.ts`
- This returns the same `taskKey → date` map as Mode 1, but computed from even distribution
- Recompute on every task toggle

---

### Mode 5 — Freeform / Menu Mode (`freeform`)

**No schedule. Just a task pool.**

**Behavior:**
- No dates are assigned to tasks
- The calendar view is replaced (or supplemented) by a task pool view, grouped by week group or focus area
- User picks what to work on each session from the pool
- Completed tasks are checked off and removed from the pool
- Progress bar and completion count still work normally
- The "Today" card shows suggested tasks (e.g., the next 1–3 uncompleted tasks in sequence) rather than a date-specific task

**Implementation notes:**
- The calendar grid can either be hidden in freeform mode or shown as a static grid without date labels
- Add a `FreeformPool` component that renders the task list grouped by `WeekGroup.title`
- Most of `dates.ts` becomes unused in this mode — wrap calendar rendering in a mode check

---

## Settings UI

Add a **Calendar Mode** selector to the existing settings area (the dropdown / `StartDatePicker` component area). It should show:

- A mode name (e.g., "Strict Sequential")
- A one-line description of what it does
- Persist the selection to `progress.calendarMode` in localStorage

For **Deadline-Anchored** mode: reveal a second date input for `endDate` when this mode is selected.

The mode selector does not need its own page yet — it can live inline in the existing settings UI alongside the start date picker.

---

## Files to Change

| File | Change |
|---|---|
| `src/lib/types.ts` | Add `CalendarMode`, extend `ProgressData` |
| `src/lib/progress.ts` | Update `defaultProgress()`, update `saveProgress` to handle new fields |
| `src/lib/dates.ts` | Add `getAssignedDates()`, `getBacklogCount()`, `computeDeadlineSchedule()`, `computeWeekRollovers()` |
| `src/hooks/useProgress.tsx` | Expose `calendarMode`, `setCalendarMode()`, `endDate`, `setEndDate()` via context |
| `src/components/StartDatePicker.tsx` | Add mode selector UI + end date input (for deadline mode) |
| `src/components/CalendarGrid.tsx` | Use assigned dates from mode-aware functions instead of raw `getDateForDay` |
| `src/components/TodayCard.tsx` | Handle catch-up backlog display + freeform suggested tasks |
| `src/components/DayCell.tsx` | Handle skipped state rendering (Mode 3) |

---

## Implementation Order (Recommended)

1. **Types & data model** — extend `ProgressData`, add `CalendarMode`, update `defaultProgress()`
2. **Mode 1 (Strict Sequential)** — implement cursor algorithm in `dates.ts`, wire into calendar rendering, update `toggleTask` to record completion dates
3. **Settings UI** — add mode selector, confirm Mode 1 works end-to-end
4. **Mode 2 (Catch-up)** — add backlog aggregation, update Today card
5. **Mode 3 (Weekly Rollover)** — add rollover logic, skipped state, auto-advance
6. **Mode 4 (Deadline-Anchored)** — add end date input, redistribution algorithm
7. **Mode 5 (Freeform)** — add pool view, hide/adapt calendar grid

---

## Out of Scope (for now)

- Pace Recommendation engine (flagged for future)
- Notifications or reminders
- Server-side persistence (all state stays in localStorage)
- Multi-curriculum support (separate PRD)
