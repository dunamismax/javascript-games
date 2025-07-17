import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: [
    {
      command: 'cd apps/pong && npm run serve',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd apps/space-invaders && npm run serve',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd apps/snake && npm run serve',
      port: 3002,
      reuseExistingServer: !process.env.CI,
    },
  ],
});