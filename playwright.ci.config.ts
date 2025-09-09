// playwright.ci.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    // Start ONLY the Next dev server in CI (avoid backend)
    command: 'npx next dev -p 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,     // if started already, don’t restart
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
