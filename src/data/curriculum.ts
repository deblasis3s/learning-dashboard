// === CURRICULUM DATA ===
// This file contains all 6 week groups from the curriculum, each with 7 daily plans.
// The weekNumbers array tells which actual calendar weeks (0-13) use each template.
// Resource links are embedded directly in each day for easy access.

import type { WeekGroup } from "@/lib/types";

export const weekGroups: WeekGroup[] = [
  // ============================================================
  // WEEKS 0–1: AI Foundations
  // ============================================================
  {
    id: "weeks-0-1",
    title: "AI Foundations",
    weekNumbers: [0, 1],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "AI Foundations",
        timeEstimate: "1.5 hr",
        description:
          "Watch 3Blue1Brown + Karpathy videos on how LLMs work",
        resourceLinks: [
          {
            name: "3Blue1Brown — But what is a GPT?",
            url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
            type: "video",
          },
          {
            name: "Andrej Karpathy — Intro to Large Language Models",
            url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
            type: "video",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "AI Foundations",
        timeEstimate: "1 hr",
        description:
          "Read Anthropic prompting guide, experiment with structured prompts",
        resourceLinks: [
          {
            name: "Anthropic Prompting Guide",
            url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "AI Foundations",
        timeEstimate: "1.5 hr",
        description:
          "Read the Agentic Coding Trends Report + State of the Designer 2026",
        resourceLinks: [
          {
            name: "Anthropic Agentic Coding Trends Report",
            url: "https://www.anthropic.com/research/agentic-coding-trends",
            type: "article",
          },
          {
            name: "Figma — State of the Designer 2026",
            url: "https://www.figma.com/blog/",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "AI Foundations",
        timeEstimate: "1.5 hr",
        description:
          "Set up your AI toolkit: Claude Code, Figma AI, Cursor/VS Code",
        resourceLinks: [
          {
            name: "Claude Code (Anthropic)",
            url: "https://docs.anthropic.com/en/docs/claude-code",
            type: "tool",
          },
          {
            name: "Cursor — AI-first IDE",
            url: "https://cursor.sh",
            type: "tool",
          },
          {
            name: "VS Code",
            url: "https://code.visualstudio.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "AI Foundations",
        timeEstimate: "1 hr",
        description:
          "Try Figma Make: generate a prototype, evaluate critically",
        resourceLinks: [
          {
            name: "Figma",
            url: "https://www.figma.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "AI Foundations",
        timeEstimate: "2 hr",
        description:
          "Build something small with Claude Code, practice the orchestration loop",
        resourceLinks: [
          {
            name: "Claude Code Docs",
            url: "https://docs.anthropic.com/en/docs/claude-code",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description: "Start Ethan Mollick's \"Co-Intelligence\"",
        resourceLinks: [
          {
            name: "Co-Intelligence by Ethan Mollick (Amazon)",
            url: "https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/059371671X",
            type: "book",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 2–3: Foundations Across All Three
  // ============================================================
  {
    id: "weeks-2-3",
    title: "Foundations Across All Three",
    weekNumbers: [2, 3],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Codecademy JS — variables, functions, control flow (no AI, build the mental model)",
        resourceLinks: [
          {
            name: "Codecademy — Learn JavaScript",
            url: "https://www.codecademy.com/learn/introduction-to-javascript",
            type: "course",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Design",
        timeEstimate: "1.5 hr",
        description: "Figma tutorials + Laws of UX reading",
        resourceLinks: [
          {
            name: "Figma Tutorials",
            url: "https://help.figma.com/hc/en-us/categories/360002051613-Get-started",
            type: "tool",
          },
          {
            name: "Laws of UX",
            url: "https://lawsofux.com",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "PM",
        timeEstimate: "1 hr",
        description:
          "Read Inspired Ch. 1–3, write a Problem Brief for a day-job feature. Use AI to critique it.",
        resourceLinks: [
          {
            name: "Inspired by Marty Cagan (Amazon)",
            url: "https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers/dp/1119387507",
            type: "book",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Codecademy JS — arrays, objects, DOM. Then rebuild one exercise with Claude Code.",
        resourceLinks: [
          {
            name: "Codecademy — Learn JavaScript",
            url: "https://www.codecademy.com/learn/introduction-to-javascript",
            type: "course",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Design",
        timeEstimate: "1 hr",
        description:
          "Build color palette + type scale in Figma. Try Figma AI color generation, compare.",
        resourceLinks: [
          {
            name: "Figma",
            url: "https://www.figma.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Build a tiny JS project two ways: yourself + with AI. Annotate a UI screenshot in FigJam.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description:
          "Refactoring UI — hierarchy and spacing chapters",
        resourceLinks: [
          {
            name: "Refactoring UI",
            url: "https://www.refactoringui.com",
            type: "book",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 4–5: Components, Specs & Web Fundamentals
  // ============================================================
  {
    id: "weeks-4-5",
    title: "Components, Specs & Web Fundamentals",
    weekNumbers: [4, 5],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description: "HTML + CSS fundamentals (Codecademy)",
        resourceLinks: [
          {
            name: "Codecademy — Learn HTML",
            url: "https://www.codecademy.com/learn/learn-html",
            type: "course",
          },
          {
            name: "Codecademy — Learn CSS",
            url: "https://www.codecademy.com/learn/learn-css",
            type: "course",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Design",
        timeEstimate: "1.5 hr",
        description:
          "Build 5 core Figma components. Have Figma AI generate one, compare.",
        resourceLinks: [
          {
            name: "Figma",
            url: "https://www.figma.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "PM",
        timeEstimate: "1.5 hr",
        description:
          "Write Fitness App PRD manually, then have AI draft one from same inputs. Compare.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Thu",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Flexbox + Grid — recreate a Figma component in code, then with Claude Code.",
        resourceLinks: [
          {
            name: "CSS Tricks — Complete Guide to Flexbox",
            url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
            type: "article",
          },
          {
            name: "CSS Tricks — Complete Guide to Grid",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Design",
        timeEstimate: "1 hr",
        description:
          "Read Alla Kholmatova Ch. 1, study a real design system",
        resourceLinks: [
          {
            name: "Design Systems by Alla Kholmatova",
            url: "https://www.smashingmagazine.com/design-systems-book/",
            type: "book",
          },
          {
            name: "Material Design",
            url: "https://m3.material.io",
            type: "website",
          },
          {
            name: "Apple Human Interface Guidelines",
            url: "https://developer.apple.com/design/human-interface-guidelines/",
            type: "website",
          },
          {
            name: "Atlassian Design System",
            url: "https://atlassian.design",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Continue Figma components + PRD editing. Practice the \"AI draft → human refine\" loop.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description:
          "Refactoring UI — components chapter, Brad Frost atomic design",
        resourceLinks: [
          {
            name: "Refactoring UI",
            url: "https://www.refactoringui.com",
            type: "book",
          },
          {
            name: "Brad Frost — Atomic Design",
            url: "https://atomicdesign.bradfrost.com/",
            type: "article",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 6–7: Flows, Data Models & Node.js
  // ============================================================
  {
    id: "weeks-6-7",
    title: "Flows, Data Models & Node.js",
    weekNumbers: [6, 7],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description: "Node.js basics — what runs outside the browser",
        resourceLinks: [
          {
            name: "Codecademy — Learn Node.js",
            url: "https://www.codecademy.com/learn/learn-node-js",
            type: "course",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Design",
        timeEstimate: "1.5 hr",
        description:
          "Map PM Agent Tool user flow in FigJam. Use FigJam AI for brainstorming.",
        resourceLinks: [
          {
            name: "FigJam",
            url: "https://www.figma.com/figjam/",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "PM",
        timeEstimate: "1.5 hr",
        description:
          "Build Fitness App ERD in dbdiagram.io. Have AI generate one from your PRD, compare.",
        resourceLinks: [
          {
            name: "dbdiagram.io",
            url: "https://dbdiagram.io",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Build a simple Express API with Claude Code. Review every file.",
        resourceLinks: [
          {
            name: "Express.js",
            url: "https://expressjs.com",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Design",
        timeEstimate: "1 hr",
        description: "Map Fitness App user flow in FigJam",
        resourceLinks: [
          {
            name: "FigJam",
            url: "https://www.figma.com/figjam/",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Connect API work to a project, refine flows. Ask Claude to review flows for edge cases.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description: "Don't Make Me Think — usability principles",
        resourceLinks: [
          {
            name: "Don't Make Me Think by Steve Krug (Amazon)",
            url: "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515",
            type: "book",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 8–10: High-Fidelity Design, Databases & PRD Mastery
  // ============================================================
  {
    id: "weeks-8-10",
    title: "High-Fidelity Design, Databases & PRD Mastery",
    weekNumbers: [8, 9, 10],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "SQL deep dive — JOINs, subqueries (SQLBolt). Write queries manually + with AI.",
        resourceLinks: [
          {
            name: "SQLBolt — Interactive SQL Tutorial",
            url: "https://sqlbolt.com",
            type: "course",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Design",
        timeEstimate: "2 hr",
        description:
          "Design PM Agent Tool screens in Figma. Use Figma Make for first-pass, refine manually.",
        resourceLinks: [
          {
            name: "Figma",
            url: "https://www.figma.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "PM",
        timeEstimate: "1 hr",
        description:
          "Acceptance criteria + edge cases for day-job features. AI-generate additional edge cases.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Thu",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Implement Fitness App ERD as real database. Use AI to generate, review critically.",
        resourceLinks: [
          {
            name: "SQLBolt — Interactive SQL Tutorial",
            url: "https://sqlbolt.com",
            type: "course",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Design",
        timeEstimate: "1.5 hr",
        description:
          "Continue Figma screens + build clickable prototype",
        resourceLinks: [
          {
            name: "Figma Prototyping Guide",
            url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Write queries against your database. Polish Figma designs. Practice release material generation with AI.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description:
          "Continuous Discovery Habits — opportunity solution trees",
        resourceLinks: [
          {
            name: "Continuous Discovery Habits by Teresa Torres (Amazon)",
            url: "https://www.amazon.com/Continuous-Discovery-Habits-Discover-Products/dp/1736633309",
            type: "book",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 11–13: Integration, AI-Native Workflows & Real-World Application
  // ============================================================
  {
    id: "weeks-11-13",
    title: "Integration, AI-Native Workflows & Real-World Application",
    weekNumbers: [11, 12, 13],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Git + GitHub workflow. Deploy a project to Vercel with Claude Code.",
        resourceLinks: [
          {
            name: "Codecademy — Learn Git & GitHub",
            url: "https://www.codecademy.com/learn/learn-git",
            type: "course",
          },
          {
            name: "GitHub Skills",
            url: "https://skills.github.com",
            type: "course",
          },
          {
            name: "Vercel",
            url: "https://vercel.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Design",
        timeEstimate: "1.5 hr",
        description:
          "Design handoff — spec your Figma file. Try Code to Canvas loop.",
        resourceLinks: [
          {
            name: "Figma",
            url: "https://www.figma.com",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "PM",
        timeEstimate: "1.5 hr",
        description:
          "Build your PM toolkit — compile templates, checklists, AI prompt templates.",
        resourceLinks: [
          {
            name: "Lenny's Newsletter",
            url: "https://www.lennysnewsletter.com",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description: "Build an app that calls Claude's API.",
        resourceLinks: [
          {
            name: "Anthropic API Docs",
            url: "https://docs.anthropic.com/en/api/getting-started",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "All Three",
        timeEstimate: "1.5 hr",
        description:
          "Read through PM Agent Tool codebase, annotate. Plan an AI-powered feature spec.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Capstone: architect + spec + design + build a new feature end-to-end with AI assistance.",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "1 hr",
        description:
          "Write up learnings, identify gaps, plan next 13 weeks.",
        resourceLinks: [],
      },
    ],
  },
];
