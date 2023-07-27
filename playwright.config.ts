import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    trace: 'off',
  },
<<<<<<< Updated upstream
=======
  testMatch: [
    "tests/**/**.test.ts"
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
>>>>>>> Stashed changes
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
