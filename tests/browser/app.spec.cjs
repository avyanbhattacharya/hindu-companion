const { test, expect } = require('@playwright/test');

test('home presents the main companion paths without external requests', async ({ page }) => {
  const external = [];
  page.on('request', request => {
    const url = new URL(request.url());
    if (!url.hostname.includes('127.0.0.1') && !url.hostname.includes('localhost')) {
      external.push(url.href);
    }
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Make space for daily devotion.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore bhajans' })).toBeVisible();
  expect(external).toEqual([]);
});

test('Markdown-backed guide pages render', async ({ page }) => {
  await page.goto('/guides');
  await page.getByRole('link', { name: 'Ekadashi Vrata' }).first().click();
  await expect(page.getByRole('heading', { name: 'Ekadashi Vrata' })).toBeVisible();
});

test('internal links preserve the GitHub Pages project path', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore bhajans' })).toHaveAttribute('href', 'bhajans/');
  await page.getByRole('link', { name: 'Explore bhajans' }).click();
  await expect(page).toHaveURL(/\/bhajans\/$/);
});

test('devotional library browse presents curated state message when all entries are draft', async ({ page }) => {
  await page.goto('/bhajans');

  // Verify curated message appears
  await expect(page.getByText('The devotional library is being curated. Please check back soon.')).toBeVisible();

  // Verify draft entries do not appear in public route or listing
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Jaya Radha-Madhava' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Govinda Jaya Jaya' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Sri Madhurashtakam' })).not.toBeVisible();
});
