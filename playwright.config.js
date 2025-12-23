import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  testDir: './tests',
 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
 
  /* Allure Report */
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        outputFolder: 'reports/allure-results'
      }
    ]
  ],
 
  /* Shared settings */
  use: {
    video: 'on',
    screenshot: 'on',
    trace: 'on-first-retry',
    viewport: null,                      // REQUIRED
    launchOptions: {
      args: ['--start-maximized'],       // REQUIRED
      headless: false
    }
  },
 
  /* Browser config */
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,                  // MUST BE ADDED HERE ALSO
        launchOptions: {
          args: ['--start-maximized'],
          headless: false
        }
      }
    }
  ]
});
 