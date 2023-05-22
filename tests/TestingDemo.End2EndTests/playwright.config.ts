/// <reference types="node" />
import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5001",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  webServer: [
    {
      command: "dotnet run",
      url: "http://localhost:5000",
      reuseExistingServer: !process.env.CI,
      cwd: "./src/TestingDemo.API",
    },
    {
      command: "npm run dev",
      url: "http://localhost:5001",
      reuseExistingServer: !process.env.CI,
      cwd: "./src/TestingDemo.Client",
    },
  ],
});
