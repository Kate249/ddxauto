import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    trace: 'off',
    browserName: "chromium",
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true
  },
  testMatch: [
    "tests/**/**.test.ts",
  ],
  testIgnore: [
   "first.test.ts"
  ],
  reporter: [["line"], ["json", { outputFile: "test-result.json" }],
  ['html', {
    open: "never",
    outputFolder: "playwright-report/"
  }]
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
