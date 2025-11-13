# Online Banking E2E Automation

End-to-end test automation framework for the GlobalSQA Banking Project using Playwright and TypeScript.

## Project Structure

```
online-banking-e2e-automation/
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts          # Base page class with common functionality
│   ├── LoginPage.ts         # Login page interactions
│   ├── AddCustomerPage.ts   # Add Customer form interactions
│   └── CustomersTablePage.ts # Customers table interactions
├── utils/                    # Utility classes and helpers
│   ├── TestDataGenerator.ts # Test data generation utilities
│   └── TestHelpers.ts       # Common test helper functions
├── tests/                    # Test specifications
│   └── customer-creation.spec.ts # Customer creation test suite
├── playwright.config.ts     # Playwright configuration
└── package.json             # Project dependencies and scripts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Test Suites

### Customer Creation Suite (@customer-creation)

Tests for Bank Manager Operations - Create Customer feature.

**Test Scenarios:**
1. **Scenario 2.1: Create Customer with Valid Data - Happy Path** (@happy-path)
   - Validates successful customer creation with all required fields
   - Verifies success message with customer ID
   - Confirms customer appears in Customers table

2. **Scenario 2.2: Verify Customer Appears in Customers Table** (@verify-table)
   - Creates a customer and verifies it appears in the table
   - Validates customer data matches input values
   - Ensures customer ID is present and unique

3. **Scenario 2.3: Create Multiple Unique Customers** (@multiple-customers)
   - Creates multiple customers with different data
   - Verifies each customer receives a unique ID
   - Confirms all customers appear in the table

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test suite
```bash
# Run all customer creation tests
npm run test:customer-creation

# Run specific scenario
npm run test:happy-path
npm run test:verify-table
npm run test:multiple-customers
```

### Run tests in headed mode (with browser visible)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### View test report
```bash
npm run test:report
```

### Run tests by file
```bash
npx playwright test tests/customer-creation.spec.ts
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Execution Tags

Tests are organized using tags for easy execution:

- `@customer-creation` - All customer creation tests
- `@happy-path` - Happy path scenario
- `@verify-table` - Table verification scenario
- `@multiple-customers` - Multiple customers scenario

## Page Object Model

The framework uses the Page Object Model (POM) pattern for maintainability:

- **BasePage**: Common functionality for all pages
- **LoginPage**: Handles login page interactions
- **AddCustomerPage**: Handles customer creation form
- **CustomersTablePage**: Handles customers table interactions

## Test Data Management

The `TestDataGenerator` utility generates unique test data:
- Generates unique customer data with timestamps
- Supports generating multiple customers
- Provides custom data generation methods

## Configuration

The `playwright.config.ts` file contains:
- Base URL configuration
- Browser projects (Chromium, Firefox, WebKit)
- Timeout settings
- Screenshot and video capture on failure
- Trace collection on retry

## Clean Code Practices

- **Page Object Model**: Separates page interactions from test logic
- **Descriptive naming**: Clear, descriptive test and method names
- **Reusable utilities**: Common functionality extracted to utilities
- **Setup/Teardown**: Proper test setup and cleanup hooks
- **Test organization**: Tests organized by feature with tags

## Setup and Cleanup

- `beforeAll`: Global setup (resets test data counter)
- `beforeEach`: Per-test setup (navigates to login, logs in as Bank Manager)
- `afterAll`: Global cleanup (available for cleanup operations)

## Reporting

Test reports are generated in HTML format and can be viewed using:
```bash
npm run test:report
```

Reports include:
- Test execution results
- Screenshots on failure
- Video recordings on failure
- Trace files for debugging

## Notes

- The application under test is an AngularJS application
- Tests handle browser alert dialogs for success/error messages
- Tests wait for Angular to finish rendering before interactions
- Customer IDs are extracted from success messages and verified in the table

