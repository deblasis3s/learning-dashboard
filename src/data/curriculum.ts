// === CURRICULUM DATA ===
// This file contains all 6 week groups from the curriculum, each with 7 daily plans.
// The weekNumbers array tells which actual calendar weeks (0-13) use each template.
// Resource links are embedded directly in each day for easy access.

import type { WeekGroup } from "@/lib/types";

export const weekGroups: WeekGroup[] = [
  // ============================================================
  // WEEKS 0–1: Browser Agent Foundations
  // ============================================================
  {
    id: "weeks-0-1",
    title: "Browser Agent Foundations",
    weekNumbers: [0, 1],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Read Playwright docs — locator strategies: CSS, XPath, role-based, text-based",
        resourceLinks: [
          {
            name: "Playwright Docs — Locators",
            url: "https://playwright.dev/docs/locators",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "DOM & Accessibility Tree — MDN intro to the DOM and how browsers build the accessibility tree",
        resourceLinks: [
          {
            name: "MDN — Introduction to the DOM",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
            type: "docs",
          },
          {
            name: "MDN — Accessibility Tree",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "YAML workflow deep dive — learn syntax with learn-yaml.com, then read a real workflow definition (metadata, variables, steps, actions). Goal: be able to read any workflow file and write a simple new step from scratch",
        resourceLinks: [
          {
            name: "Learn X in Y Minutes — YAML",
            url: "https://learnxinyminutes.com/docs/yaml/",
            type: "docs",
          },
          {
            name: "Playwright — YAML Workflow Patterns (GitHub search)",
            url: "https://github.com/search?q=playwright+workflow+yaml&type=repositories",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "AI Foundations",
        timeEstimate: "1 hr",
        description:
          "Prompt engineering for agents — structured outputs, chain-of-thought, confidence scoring. Read Anthropic prompting guide + promptingguide.ai",
        resourceLinks: [
          {
            name: "Anthropic Prompting Guide",
            url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
            type: "docs",
          },
          {
            name: "Promptingguide.ai",
            url: "https://www.promptingguide.ai",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "PM",
        timeEstimate: "1.5 hr",
        description:
          "RCM & healthcare billing domain literacy — understand what EOBs, 835 transactions, and VCC payments are and why they're financially high-stakes. Read enough to speak the domain fluently and reason about failure severity",
        resourceLinks: [
          {
            name: "CMS — Electronic Billing & 835 EDI Transactions",
            url: "https://www.cms.gov/medicare/payment/claims-and-billing/electronic-billing-and-edi-transactions",
            type: "article",
          },
          {
            name: "Healthcare.gov — Explanation of Benefits (EOB)",
            url: "https://www.healthcare.gov/glossary/explanation-of-benefits/",
            type: "article",
          },
          {
            name: "HFMA — Revenue Cycle Management Basics",
            url: "https://www.hfma.org/revenue-cycle-management/",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Hands-on: install Playwright locally, write a simple script targeting a real page, intentionally break a locator and observe the error",
        resourceLinks: [
          {
            name: "Playwright — Getting Started",
            url: "https://playwright.dev/docs/intro",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description:
          "AI Foundations videos — 3Blue1Brown \"But what is a GPT?\" and Karpathy Intro to Large Language Models",
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
    ],
  },

  // ============================================================
  // WEEKS 2–3: Browser Agent Architecture & AI Integration
  // ============================================================
  {
    id: "weeks-2-3",
    title: "Browser Agent Architecture & AI Integration",
    weekNumbers: [2, 3],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "AWS fundamentals for this stack — SQS FIFO task queuing (how messages flow from worker to execution worker), S3 artifact storage (result.json, execution.log, page.html snapshots). Conceptual understanding, no hands-on required",
        resourceLinks: [
          {
            name: "AWS SQS — What is Amazon SQS?",
            url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
            type: "docs",
          },
          {
            name: "AWS S3 — Getting Started",
            url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "AI Foundations",
        timeEstimate: "1.5 hr",
        description:
          "LLM + OCR + PDF extraction pattern — understand how the system uses Textract + LLM for PDF analysis today. Then design the healing response schema as an extension of that same pattern: structured JSON with selector, confidence score, and reasoning",
        resourceLinks: [
          {
            name: "AWS Textract — How it Works",
            url: "https://docs.aws.amazon.com/textract/latest/dg/how-it-works.html",
            type: "docs",
          },
          {
            name: "Promptingguide.ai — Chain-of-Thought",
            url: "https://www.promptingguide.ai/techniques/cot",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "AI Foundations",
        timeEstimate: "1 hr",
        description:
          "Chaos Engineering — read the Principles of Chaos Engineering manifesto (10 min), then Netflix Tech Blog posts on Chaos Monkey",
        resourceLinks: [
          {
            name: "Principles of Chaos Engineering",
            url: "https://principlesofchaos.org",
            type: "article",
          },
          {
            name: "Netflix Tech Blog — Chaos Engineering",
            url: "https://netflixtechblog.com/tagged/chaos-engineering",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "CS",
        timeEstimate: "1.5 hr",
        description:
          "Read the execution artifacts — examine a sample result.json, execution.log, and page.html DOM snapshot from the browser agent system. Map which step failed, what the snapshot shows, and what context a healing agent would need to recover. Then read Honeycomb blog for observability mental models",
        resourceLinks: [
          {
            name: "Honeycomb Blog",
            url: "https://www.honeycomb.io/blog",
            type: "article",
          },
          {
            name: "OpenTelemetry — What is OpenTelemetry?",
            url: "https://opentelemetry.io/docs/what-is-opentelemetry/",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "PM",
        timeEstimate: "1 hr",
        description:
          "Cost optimization — LLM tiering mental model (rules → cheap model → frontier model), caching healed selectors, token budgeting",
        resourceLinks: [
          {
            name: "Anthropic — Models Overview",
            url: "https://docs.anthropic.com/en/docs/about-claude/models/overview",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "With Claude, map and annotate the existing browser agent codebase — understand how process YAMLs are structured and where LLM calls are made",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description: "Start Co-Intelligence by Ethan Mollick",
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
  // WEEKS 4–5: JS & Web Fundamentals
  // ============================================================
  {
    id: "weeks-4-5",
    title: "JS & Web Fundamentals",
    weekNumbers: [4, 5],
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
        description: "Figma tutorials + Laws of UX",
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
          "Read Inspired Ch. 1–3, write a Problem Brief for a day-job feature, use AI to critique it",
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
          "Codecademy JS — arrays, objects, DOM manipulation. Then rebuild one exercise with Claude Code",
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
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Build a Playwright test using JS you just learned — modify it, add a second locator strategy, observe it break and recover",
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
        description:
          "Node.js basics — what runs outside the browser (critical for understanding Playwright's execution model)",
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
          "Map the browser agent process flow end-to-end in FigJam — from YAML trigger to heal outcome",
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
          "Design a self-healing event log schema in dbdiagram.io — what data gets stored when a heal happens",
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
        description: "Map a day-job feature user flow in FigJam",
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
          "Connect API work to a project; ask Claude to review flows for edge cases and failure modes",
        resourceLinks: [],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reading",
        timeEstimate: "1 hr",
        description: "Don't Make Me Think by Steve Krug",
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
