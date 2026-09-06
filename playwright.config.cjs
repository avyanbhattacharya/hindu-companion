const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir:'./tests/browser', fullyParallel:true, timeout:30000,
  globalTimeout:process.env.CI ? 240000 : 0, expect:{timeout:5000},
  workers:process.env.CI ? 2 : undefined, retries:process.env.CI ? 1 : 0,
  forbidOnly:!!process.env.CI, reporter:process.env.CI ? [['list'],['html',{open:'never'}]] : 'list',
  use:{baseURL:'http://127.0.0.1:3000',trace:'on-first-retry',screenshot:'only-on-failure'},
  projects:[{name:'chromium',use:devices['Desktop Chrome']},{name:'webkit',use:devices['Desktop Safari']},{name:'mobile-webkit',use:devices['iPhone 13']}],
  webServer:{command:'node scripts/serve.cjs',url:'http://127.0.0.1:3000',reuseExistingServer:true,timeout:15000}
});
