import { test, expect } from '@playwright/test';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

test('app loads and shows Connect Wallet', async ({ page }) => {
  await page.goto(APP_URL);
  await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
});

test('nav tabs render', async ({ page }) => {
  await page.goto(APP_URL);
  const headerNav = page.getByRole('navigation').first();
  for (const tab of ['Dashboard', 'Deposit', 'Stake', 'Leaderboard', 'Governance']) {
    await expect(headerNav.getByRole('link', { name: new RegExp(`^${tab}$`, 'i') })).toBeVisible();
  }
});
