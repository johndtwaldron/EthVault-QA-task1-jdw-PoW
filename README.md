# ETHVault – QA Assessment (PoW) · John Waldron

[![e2e](https://github.com/johndtwaldron/EthVault-QA-task1-jdw-PoW/actions/workflows/ci.yml/badge.svg)](https://github.com/<GITHUB_USER_OR_ORG>/<REPO_NAME>/actions/workflows/ci.yml)
<br>
> **Repo:** `johndtwaldron/EthVault-QA-task1-jdw-PoW`
**Latest green CI run:** <https://github.com/johndwaldron/EthVault-QA-task1-jdw-PoW/actions/runs/<RUN_ID>>

---

## Overview

This repo contains my ETHVault QA submission:
- **Automation:** Playwright UI smoke (CI) + local API probe (Mocha) + local Selenium smoke.
- **Docs:** Bug log (≥5), test cases, run notes.
- **CI:** GitHub Actions using official Playwright container; CI-only config starts **Next.js only** (no backend), uploads reports.

---

## Quick Links (insert before sending)

- **Bug Report (Google Doc):** <[JDW EthVault BugReport GoogleDoc Link](https://docs.google.com/document/d/1naPqSPKy_cs108TmY0DRqz_3H_6P0e8Hfll4QZgOn-4/edit?usp=sharing)>
- **Test Cases (Google Sheet):** [JDW EthVault TestCases GoogleSheet Link](https://docs.google.com/spreadsheets/d/1K0agO-u27PN_9pDa9kyOrv4a1Wvghz9tyJ5YR62NALM/edit?gid=0#gid=0)>
- **Loom Walkthrough:** <TBD>

---

## 📁 Repo Map
app/, backend/, components/, public/, styles/ # app sources
tests/ # automation (Playwright TS, Mocha .mjs, Selenium)
docs/ # RUN_NOTES.md, BUGS.md, TESTCASES.csv, snapshots
.github/workflows/ci.yml # GitHub Actions (Playwright container)
playwright.ci.config.ts # CI-only Playwright config (Next-only server)


---

## Local Run (App)

> Requires Node 20.x

```bash
npm install
npm run dev
# browse http://localhost:3000
```

If you need environment variables for backend locally, use backend/.env (kept out of Git).

# Local Tests
```bash
Playwright (UI)
# against a running dev server
npm run test:ui

# API Probe (Mocha)
npm run test:api

Selenium Smoke (Chromedriver v140)
# optional: override Chrome path & watch the browser
# PowerShell:
$env:CHROME_BIN="C:\Program Files\Google\Chrome\Application\chrome.exe"
$env:HEADLESS="false"
npm run test:selenium
```

# Artifacts (local):

playwright-report/ – HTML report

test-results/ – screenshots & chromedriver.log

---

## CI (GitHub Actions)

Workflow: .github/workflows/ci.yml
Runs inside: mcr.microsoft.com/playwright:v1.47.0-jammy
Steps:
```bash
npm ci
# Install Playwright deps: npx playwright install --with-deps

Run tests: npx playwright test -c playwright.ci.config.ts

CI-only config: playwright.ci.config.ts

Starts Next.js only (npx next dev -p 3000) to avoid backend env checks.

Ignores Mocha/Selenium files (*.mjs) so Playwright doesn’t try to run them.

Stub envs (safe/no-op) set in workflow to keep startup happy:

SENDGRID_API_KEY=SG.fake_ci_key_for_tests

CLOUDINARY_URL=cloudinary://key:secret@cloudname

Artifacts uploaded from each run:

playwright-report (HTML)

test-results (screenshots/logs)
```
# Documents (in docs/)

RUN_NOTES.md — local setup & commands

BUGS.md — ≥5 issues with Severity, Repro, Expected vs Actual, Evidence

TESTCASES.csv — 5 cases (functional / UX / perf) ready for import to Sheets

snapshot-*.txt/json — Node/npm versions, npm ls, scripts, binaries



## Summary Notes & Improvements

Found issues include: NaN balances pre-connect, wallet connect error overlay, governance empty state, no skeletons on cold start, refresh button UX. See docs/BUGS.md.

Next steps (post-assessment): extend Playwright coverage for auth/wallet edge cases, governance actions; add Gitpod or Docker Compose dev env.
