# RUN NOTES — ETHVault (Local & CI)

**Author:** John Waldron  
**Host (dev):** Windows 11  
**Node/npm:** v20.x / npm 10.x

These notes explain how to run the app locally, execute tests, see reports/artifacts, and what CI does. This file is the canonical reference for reviewers.

---

## 1) Project quickstart (local)
bash # from repo root npm install npm run dev # browse http://localhost:3000
`

Stop the dev server with **CTRL + C**.

> **Local env:** If the backend needs secrets locally, keep them in `../backend/.env` (not tracked in Git). The UI-only smoke tests don’t require real external keys.

---

## 2) Test commands (local)

All commands are run from **repo root**.

### 2.1 Playwright — UI smoke

Runs the TypeScript specs under `../tests`.
bash # against a running dev server npm run test:ui
**Report (HTML):**

* Generated at `playwright-report/`
* Open via: `npx playwright show-report` **or** open `playwright-report/index.html`

### 2.2 API probe — Mocha

A tiny liveness check for `GET /`.
bash npm run test:api
**Output:** console (no HTML UI). This is intentionally small to keep the app code/deps untouched.

### 2.3 Selenium smoke — Mocha + Chromedriver

Validates key UI affordances through Selenium/Chrome.
bash # optional (Windows): point to Chrome and run visible # PowerShell $env:CHROME_BIN = "C:\Program Files\Google\Chrome\Application\chrome.exe" $env:HEADLESS = "false" npm run test:selenium
**Artifacts (Selenium):**

* `test-results/chromedriver.log` – verbose Chromedriver log
* `test-results/*.png` – failure screenshots (captured on test failure)

---

## 3) Reports & artifacts (local)

### Playwright (UI)

* **Folder:** `playwright-report/`
* **Open:** `npx playwright show-report` or open `playwright-report/index.html`
* **What you’ll see:** Suites → tests → steps, console, network, screenshots, traces (trace on first retry)

### Selenium (Mocha)

* **Folder:** `test-results/`
* **Files:** `chromedriver.log`, `*.png` (on failure)
* **Viewer:** open PNGs directly; logs are plain text

---

## 4) CI overview (GitHub Actions)

* **Workflow file:** [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)

* **Runner image:** `mcr.microsoft.com/playwright:v1.47.0-jammy` (browsers + deps preinstalled)

* **What CI does:**

  1. `npm ci`
  2. `npx playwright install --with-deps`
  3. **Runs Playwright with a CI-only config:**
     `npx playwright test -c playwright.ci.config.ts`

* **CI-only Playwright config:** [`../playwright.ci.config.ts`](../playwright.ci.config.ts)

  * Starts **Next.js only** (`npx next dev -p 3000`) as the web server (avoids backend/env checks for UI smoke)
  * Ignores Mocha/Selenium files (`*.mjs`) so Playwright doesn’t try to run them

* **Artifacts uploaded per run (Actions → Artifacts):**

  * `playwright-report` (HTML)
  * `test-results` (screenshots, logs, traces)

> **Note:** A separate local config (`../playwright.config.ts`) exists for development. CI **explicitly** uses the CI-only config above.

---

## 5) Traceability (tests ↔ bugs)

* **Test cases:** see `SUBMISSION_JDW_QA_NOTES/TESTCASES.csv`
* **Bug log:** see `SUBMISSION_JDW_QA_NOTES/BUGS.md`

Failing cases reference their bug IDs in **Notes** (e.g., `TC-003 → BUG-001`, `TC-005 → BUG-004`), so reviewers can jump from a failing test to a detailed repro/expected/actual.

---

## 6) Troubleshooting (local)

### EPERM / file lock on Windows during `npm install`

Kill processes that often hold locks:
```bash
taskkill /F /IM node.exe /T 2>$null taskkill /F /IM chrome.exe /T 2>$null taskkill /F /IM chromedriver.exe /T 2>$null
```

# Then clean and reinstall:
```bash
npx rimraf node_modules .next package-lock.json npm cache clean --force npm install
```
### Port already in use (3000)

Another Next/dev server is running:

* Stop existing server(s) (CTRL+C in that terminal) or kill the process using the port.

### Selenium can’t find Chrome

Set `CHROME_BIN` explicitly (see 2.3). On Linux CI the workflow uses system Chrome automatically.

---

## 7) Files of interest (relative to this file)

* CI workflow: [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)
* Playwright CI config: [`../playwright.ci.config.ts`](../playwright.ci.config.ts)
* Local Playwright config: [`../playwright.config.ts`](../playwright.config.ts)
* UI specs: [`../tests/ui-smoke.spec.ts`](../tests/ui-smoke.spec.ts), [`../tests/dashboard-preconnect.spec.ts`](../tests/dashboard-preconnect.spec.ts)
* API probe: [`../tests/api.ping.test.mjs`](../tests/api.ping.test.mjs)
* Selenium smoke: [`../tests/selenium.smoke.test.mjs`](../tests/selenium.smoke.test.mjs)
