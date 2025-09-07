# EthVault – QA Assessment (PoW) by John Waldron

This repository contains my deliverables for the EthVault QA assessment:
- `RUN_NOTES.md` – setup/run notes (local env, issues & fixes)
- `BUGS.md` – at least 5 issues with clear repro steps, expected vs actual, severity
- `TESTCASES.csv` – 5 test cases (functional, security, performance)
- `tests/smoke.spec.ts` – minimal Playwright smoke test
- CI: `.github/workflows/ci.yml` runs Playwright in GitHub Actions

## Running the smoke test locally

Requirements:
- Node 20.x (`node -v`)
- The EthVault app running at `http://localhost:3000` (from the Bitbucket repo)

Install & run:
```bash
npm install
APP_URL=http://localhost:3000 npx playwright test --reporter=line

### CI status (Sept 7, 2025)
- Initial CI failed: `playwright: not found` → @playwright/test was not installed.
- Fixed by installing dev dependency and committing lockfile.
- Updated workflow to skip e2e unless APP_URL secret is present (since localhost is not reachable from GitHub runners).

---

### Playwright smoke (Sept 7, 2025)
- Local APP_URL: http://localhost:3000
- Initial failure: strict mode (duplicate 'Dashboard' links header/footer).
- Fix: scope to header `<nav>` using page.getByRole('navigation').getByRole('link', …).
- Current tests:
  1) Connect Wallet button visible — PASS
  2) Nav tabs render (scoped to header) — PASS
  3) NaN visible before wallet connect — PASS (documents known bug)
- Tip: Use `--reporter=html` then `show-report` to view HTML report.
