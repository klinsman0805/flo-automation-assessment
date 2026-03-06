# Submission Notes

Below are concise answers to the questions about the testing work:

---

### QA tech: pros & cons
We used **Playwright** because it’s TypeScript‑friendly, cross‑browser and comes with built‑in reports, tracing and fixtures. The downside is the bulk of the library and the usual brittleness/slow speed of full‑E2E tests. The backend is mocked in‑code, which is fast but not a substitute for real‑world API tests.

### Test design & structure
Specs live under `tests/`, grouped by feature (auth, dashboard, form, API). A page‑object layer (`tests/pages/*`) keeps selectors and actions in one place, and a small `helpers.ts` centralises login logic and constants.

### Patterns, conventions & docs
All code is TypeScript, selectors use names/text for stability, and we added npm scripts plus README instructions. Keeping tests readable and the repo documented makes onboarding easier.

### What to do better next time
Isolate state (don’t write to `data.json`), add more edge cases and hook the suite into CI with reports/artifacts. A faster layer of unit/component tests would also help.

### Alternative approaches
Cypress or Jest/RTL for lighter-weight tests, supertest for pure API checks, or Storybook for visual regression—any of these could complement or replace the current Playwright setup.
