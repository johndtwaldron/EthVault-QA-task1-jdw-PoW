import { test, expect } from '@playwright/test';

// APP_URL comes from env; default to local dev
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

test('app loads and shows Connect Wallet', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
});

// You can add tiny assertions for nav tabs to prove structure:
test('nav tabs render', async ({ page }) => {
  await page.goto(APP_URL);
  for (const tab of ['Dashboard', 'Deposit', 'Stake', 'Leaderboard', 'Governance']) {
    await expect(page.getByRole('link', { name: new RegExp(tab, 'i') })).toBeVisible();
  }
});
