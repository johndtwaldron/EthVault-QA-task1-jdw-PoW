import { test, Locator, expect } from '@playwright/test';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

// Tag this so CI can exclude it (and we also mark it as an expected fail).
test.describe('@known-bug', () => {
  test.fixme('dashboard shows NaN before wallet connect (known bug)', async ({ page }) => {

    await page.goto(APP_URL);

    // ...existing code...
    // Find the cards by label, then pick the big number element inside the card.
    const cardByName = (name: RegExp) =>
      page.getByRole('region', { name });

    const availableCard = cardByName(/available balance/i);
    const stakedCard    = cardByName(/staked balance/i);

    // Heuristic: the numeric value is usually the first element in the card
    // that looks like a number or "NaN". Adjust as needed if DOM differs.
    const valueIn = (card: Locator) =>
      card.locator('*').filter({ hasText: /^(?:NaN|[\d,.]+)$/ }).first();

    await expect(valueIn(availableCard)).toHaveText(/NaN/i);
    await expect(valueIn(stakedCard)).toHaveText(/NaN/i);
// ...existing code...
  });
});
