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

test('Markdown-backed bhajan and guide pages render', async ({ page }) => {
  await page.goto('/bhajans');
  await page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' }).first().click();
  await expect(page.getByRole('heading', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();

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

test('devotional library browse, filter, search, language switcher, and status rules', async ({ page }) => {
  await page.goto('/bhajans');

  // Check published items are visible and status badges appear
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jaya Radha-Madhava' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Govinda Jaya Jaya' })).toBeVisible();

  // Excluded 'not-published' entry should NOT be listed
  await expect(page.getByRole('link', { name: 'Internal Archival Song (Unpublished Draft)' })).not.toBeVisible();

  // Test search filter input
  const searchInput = page.getByRole('searchbox', { name: 'Search devotional library' });
  await searchInput.fill('Madhurashtakam');
  await expect(page.getByRole('link', { name: 'Sri Madhurashtakam' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).not.toBeVisible();

  // Clear search
  await searchInput.fill('');

  // Test language filter / switcher
  const languageSelect = page.getByRole('combobox', { name: 'Filter by language' });
  await languageSelect.selectOption('Hindi');
  await expect(page.getByRole('link', { name: 'Govinda Jaya Jaya' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).not.toBeVisible();

  // Test status filter
  await languageSelect.selectOption('');
  const statusSelect = page.getByRole('combobox', { name: 'Filter by review status' });
  await statusSelect.selectOption('needs-review');
  await expect(page.getByRole('link', { name: 'Sri Madhurashtakam' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jaya Radha-Madhava' })).not.toBeVisible();

  // Reset status filter and view detail page schema fields
  await statusSelect.selectOption('');
  await page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' }).first().click();
  await expect(page.getByText('Source Edition')).toBeVisible();
  await expect(page.getByText('Rights Status')).toBeVisible();
  await expect(page.getByText('Translation Status')).toBeVisible();
  await expect(page.getByText('Pandita K. Sharma')).toBeVisible();
});
