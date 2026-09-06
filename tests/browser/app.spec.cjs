const { test, expect } = require('@playwright/test');

test('bhakti companion loads calendar, allows location switching, and searches songs without external network', async ({ page }) => {
  const externalRequests = [];
  page.on('request', r => {
    const url = new URL(r.url());
    if (url.origin !== 'http://localhost:4173' && url.origin !== 'http://127.0.0.1:4173' && url.origin !== 'http://localhost:3000' && url.origin !== 'http://127.0.0.1:3000') {
      externalRequests.push(r.url());
    }
  });

  await page.goto('/');

  // Verify header and initial calendar
  await expect(page.locator('#brand-logo')).toContainText('Bhakti Companion');
  await expect(page.locator('#today-location-name')).toContainText('Phoenix, Arizona');

  // Switch location to Kolkata
  await page.locator('#location-select').selectOption('kolkata');
  await expect(page.locator('#today-location-name')).toContainText('Kolkata, West Bengal');

  // Navigate to Bhajans & Prayers tab
  await page.locator('#tab-bhajans').click();
  await expect(page.locator('#panel-bhajans')).toBeVisible();

  // Search for songs
  await page.locator('#library-search-input').fill('Radha');
  await expect(page.locator('#song-card-jaya-radha-madhava')).toBeVisible();

  // Open Sing-Along reader modal
  await page.locator('#song-card-jaya-radha-madhava button:has-text("Sing Along")').click();
  await expect(page.locator('#modal-sing-along')).toHaveClass(/active/);
  await expect(page.locator('#modal-song-title')).toHaveText('Jaya Radha-Madhava');

  // Close modal
  await page.locator('#btn-close-modal').click();
  await expect(page.locator('#modal-sing-along')).not.toHaveClass(/active/);

  // Assert no external network requests were made
  expect(externalRequests).toEqual([]);
});

test('home program builder and mobile responsive layout', async ({ page }) => {
  await page.goto('/');

  // Navigate to Home Program
  await page.locator('#tab-program').click();
  await expect(page.locator('#panel-program')).toBeVisible();

  // Verify preset items loaded
  await expect(page.locator('#program-items-list')).toBeVisible();
  const count = await page.locator('.program-item').count();
  expect(count).toBeGreaterThan(0);

  // Responsive layout check
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();

  // Handbook navigation
  await page.getByRole('link', { name: 'Handbook' }).click();
  await expect(page.locator('h1')).toHaveText('Handbook');
});
