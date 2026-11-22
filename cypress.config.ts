import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    video: false,
    // The Next.js dev server compiles each page on its first visit, which
    // can take well over a minute on the Jenkins machine.
    pageLoadTimeout: 120000,
    // Retry a failed test in `cypress run` (Jenkins) only, not in `cypress open`.
    retries: { runMode: 2, openMode: 0 },
  },
});
