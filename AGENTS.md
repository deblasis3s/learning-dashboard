# Learning Dashboard

A Next.js dashboard that tracks Sam's progress through multiple curricula (AI Product Builder, Healthcare Systems & Payment), each with its own calendar and progress saved in namespaced localStorage keys.

## Exocortex

- Read the project brief first: the Learning Dashboard section of `~/Dev/exocortex/projects/personal/personal-projects.md`.
- At session end, write a session log per `~/Dev/exocortex/rules/session-logging.md`, add it to `sessions/INDEX.md`, and update the brief if status changed.

## Project Notes

- Curricula are data, registered in `src/data/curricula.ts`; each curriculum has its own file in `src/data/`.
- `PRD-dynamic-calendar.md` is a ready-to-implement feature spec.
- The repo is linked to Vercel (`.vercel/`). Treat pushes to `main` as deploys.
- Work has sat uncommitted here before while the session log said it was done. Check `git status` against the latest session log before assuming something shipped.

## Commands

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm run lint
```
