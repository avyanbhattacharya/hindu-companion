const { test, expect } = require('@playwright/test');
test('home presents the main companion paths without external requests', async ({ page }) => {
  const external = []; page.on('request', request => { const url = new URL(request.url()); if (!url.hostname.includes('127.0.0.1') && !url.hostname.includes('localhost')) external.push(url.href); });
  await page.goto('/'); await expect(page.getByRole('heading', { name: 'Make space for daily devotion.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore bhajans' })).toBeVisible(); expect(external).toEqual([]);
});
test('Markdown-backed bhajan and guide pages render', async ({ page }) => {
  await page.goto('/bhajans'); await page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' }).first().click(); await expect(page.getByRole('heading', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();
  await page.goto('/guides'); await page.getByRole('link', { name: 'Ekadashi Vrata' }).first().click(); await expect(page.getByRole('heading', { name: 'Ekadashi Vrata' })).toBeVisible();
});
test('internal links preserve the GitHub Pages project path', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore bhajans' })).toHaveAttribute('href', 'bhajans/');
  await page.getByRole('link', { name: 'Explore bhajans' }).click();
  await expect(page).toHaveURL(/\/bhajans\/$/);
});
