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
