// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['line']] : [['html'], ['line']],
  use: {
    baseURL: APP_URL,
    headless: true,
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
  },
  // 👇 Playwright should NOT try to run Mocha .mjs files:
  testMatch: ['**/*.spec.ts'],
  testIgnore: ['**/*.mjs', '**/selenium*', '**/api.*'],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  // Start servers only on CI; locally you’ll usually run `npm run dev`.
  webServer: isCI
    ? [
        // If your UI works without the backend, you can remove this block.
        { command: 'node backend/index.js', port: 5001, reuseExistingServer: true, timeout: 60_000 },
        { command: 'npx next start -p 3000', port: 3000, reuseExistingServer: true, timeout: 120_000 },
      ]
    : undefined,
});
