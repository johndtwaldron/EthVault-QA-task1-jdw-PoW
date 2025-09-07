import { test, expect } from '@playwright/test';

// APP_URL comes from env; default to local dev
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

test('app loads and shows Connect Wallet', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
});

test('nav tabs render', async ({ page }) => {
  await page.goto(APP_URL);
  const headerNav = page.getByRole('navigation'); // header <nav>

  for (const tab of ['Dashboard', 'Deposit', 'Stake', 'Leaderboard', 'Governance']) {
    await expect(headerNav.getByRole('link', { name: new RegExp(`^${tab}$`, 'i') })).toBeVisible();
  }
});

test('dashboard shows NaN before wallet connect (current bug)', async ({ page }) => {
  await page.goto(process.env.APP_URL || 'http://localhost:3000');
  // adjust selector to your card content; this is generic:
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).toMatch(/NaN/);
});
