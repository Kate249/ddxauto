import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  use: {
    headless: false,
    browserName: "chromium",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "off"
  },
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
