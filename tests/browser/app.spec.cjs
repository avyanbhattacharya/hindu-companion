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

test('devotional library browse, filter, search, language switcher, and non-public state rules', async ({ page }) => {
  await page.goto('/bhajans');

  // Check published public items are visible
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jaya Radha-Madhava' })).toBeVisible();

  // Non-verified items (draft, needs-review, not-published) MUST NOT appear in public library listing
  await expect(page.getByRole('link', { name: 'Govinda Jaya Jaya' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Sri Madhurashtakam' })).not.toBeVisible();

  // Test search filter input for verified items
  const searchInput = page.getByRole('searchbox', { name: 'Search devotional library' });
  await searchInput.fill('Maha-Mantra');
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jaya Radha-Madhava' })).not.toBeVisible();

  // Clear search
  await searchInput.fill('');

  // Test language switcher / filter
  const languageSelect = page.getByRole('combobox', { name: 'Filter by language' });
  await languageSelect.selectOption('Sanskrit');
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();

  // Test secondary tradition filter
  const traditionSelect = page.getByRole('combobox', { name: 'Filter by tradition' });
  await traditionSelect.selectOption('Universal');
  await expect(page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jaya Radha-Madhava' })).not.toBeVisible();

  // Reset tradition filter and view detail page
  await traditionSelect.selectOption('');

  // Detail page verification for verified content
  await page.getByRole('link', { name: 'Hare Krishna Maha-Mantra' }).first().click();
  await expect(page.getByText('Source Citation')).toBeVisible();
  await expect(page.getByText('Source Link')).toBeVisible();
  await expect(page.getByText('Text Rights', { exact: true })).toBeVisible();
  await expect(page.getByText('Translation Rights', { exact: true })).toBeVisible();
  await expect(page.getByText('Translation Status')).toBeVisible();
  await expect(page.getByText('Gaudiya Vaishnava, Universal')).toBeVisible();
});
