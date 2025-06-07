import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://check.opsify.dev/');
  await expect(page).toHaveTitle(/Check/); // Adjust the regex if needed
}); 