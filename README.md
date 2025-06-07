# Playwright E2E Tests for https://check.opsify.dev/

## Running Tests Locally

1. Install dependencies:
   ```sh
   npm install
   ```
2. Install Playwright browsers:
   ```sh
   npx playwright install --with-deps
   ```
3. Run tests:
   ```sh
   npm run test:e2e
   ```

## Azure DevOps Pipeline

- The `azure-pipelines.yml` file is configured to:
  - Install Node.js
  - Install dependencies
  - Install Playwright browsers
  - Run Playwright tests
  - Publish test results

Push changes to the `main` branch to trigger the pipeline. 