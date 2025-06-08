# Opsify Website Automation Testing

This project contains automated end-to-end tests for the Opsify website (https://check.opsify.dev/) using Playwright.

## Project Structure

```
├── tests/
│   ├── e2e/           # End-to-end test scenarios
│   ├── pages/         # Page Object Models
│   └── utils/         # Utility functions and helpers
├── config/            # Configuration files
└── reports/          # Test execution reports
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests in specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run tests in debug mode
```bash
npm run test:debug
```

## Test Structure

The test suite follows the Page Object Model (POM) pattern for better maintainability and reusability:

- **Page Objects**: Located in `tests/pages/`, these files contain the selectors and methods for interacting with specific pages
- **Test Scenarios**: Located in `tests/e2e/`, these files contain the actual test cases
- **Utilities**: Located in `tests/utils/`, these files contain helper functions and common utilities

## Best Practices

1. **Page Object Model**
   - Each page has its own class with selectors and methods
   - Encapsulates page-specific logic
   - Makes tests more maintainable

2. **Test Organization**
   - Tests are organized by feature/functionality
   - Each test file focuses on a specific area
   - Clear naming conventions for test files and methods

3. **Assertions**
   - Use meaningful assertions
   - Include clear error messages
   - Verify both positive and negative scenarios

4. **Test Data**
   - Use test data fixtures
   - Avoid hardcoding test data
   - Clean up test data after tests

5. **Reporting**
   - Generate HTML reports for test runs
   - Include screenshots for failed tests
   - Track test execution time

## Continuous Integration

The project is configured to run in CI environments. The test suite will:
- Run on multiple browsers
- Generate test reports
- Handle test failures gracefully

## Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Ensure all tests pass
4. Submit a pull request

## Troubleshooting

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Node.js and npm versions
3. Clear the Playwright cache if needed: `npx playwright install --force` 