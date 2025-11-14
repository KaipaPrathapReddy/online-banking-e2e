# Online Banking E2E Automation

End-to-end test automation framework for the GlobalSQA Banking Project using Playwright and TypeScript.

## Project Structure

```
online-banking-e2e-automation/
├── config/                   # Configuration files
│   └── env-config.ts        # Environment configuration
├── fixtures/                 # Playwright fixtures for reusable setup
│   ├── bank-manager-login.ts # Bank manager login fixture
│   └── customer-login.ts    # Customer login fixture
├── flows/                    # Business flow classes (encapsulate complete workflows)
│   ├── create-customer-flow.ts # Customer creation flow
│   ├── open-account-flow.ts    # Account opening flow
│   └── transaction-flow.ts     # Transaction (deposit/withdraw) flow
├── helpers/                  # Utility classes and helpers
│   ├── custom-waits.ts      # Custom wait utilities
│   ├── data-generator.ts    # Test data generation (using Faker)
│   └── ui-helpers.ts        # Common UI interaction helpers
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts          # Base page class with common functionality
│   ├── LoginPage.ts         # Login page interactions
│   ├── bank-manager/        # Bank manager pages
│   │   ├── add-customer-page.ts      # Add Customer form
│   │   ├── customers-page.ts        # Customers table
│   │   ├── manager-global-fields.ts # Common bank manager navigation
│   │   └── open-account-page.ts     # Open Account form
│   └── customer/            # Customer pages
│       ├── customer-dashboard-page.ts # Customer dashboard
│       ├── deposit-page.ts           # Deposit form
│       └── transactions-page.ts     # Transactions table
├── tests/                    # Test specifications
│   ├── bank-manager/        # Bank manager test suites
│   │   ├── add-customer.spec.ts # Customer creation tests
│   │   └── open-account.spec.ts # Account opening tests
│   └── customer/            # Customer test suites
│       └── make-transactions.spec.ts # Deposit/transaction tests
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

### Bank Manager Operations

#### Customer Creation (`tests/bank-manager/add-customer.spec.ts`)
Tests for Bank Manager Operations - Create Customer feature.

**Test Scenarios:**
- **Add new customer**: Creates a customer with valid data, verifies success message, confirms customer appears in table, and verifies customer can login

#### Account Opening (`tests/bank-manager/open-account.spec.ts`)
Tests for Bank Manager Operations - Open Account feature.

**Test Scenarios:**
- **Open new account for existing customer**: Opens account, verifies success message with account number, and confirms account appears in customers table
- **Open multiple new accounts for existing customer**: Opens multiple accounts and verifies all account numbers in table
- **Open multiple new accounts with different currencies**: Opens accounts with different currencies and verifies all in table

### Customer Operations

#### Make Transactions (`tests/customer/make-transactions.spec.ts`)
Tests for Customer Operations - Make Deposit feature.

**Test Scenarios:**
- **Make successful deposit to existing account**: Makes deposit, verifies success message, balance update, and transaction record
- **Validate empty amount field shows tooltip**: Validates HTML5 validation for empty amount field
- **Make multiple deposits and verify all transactions**: Makes multiple deposits and verifies each transaction in the table

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

## Architecture

### Page Object Model (POM)

The framework uses the Page Object Model (POM) pattern for maintainability:

**Base Classes:**
- **BasePage**: Common functionality for all pages (navigation, logout, etc.)
- **ManagerGlobalFields**: Common navigation for bank manager pages
- **CustomerDashboardPage**: Customer dashboard with common navigation

**Bank Manager Pages:**
- **LoginPage**: Handles login page interactions
- **AddCustomerPage**: Handles customer creation form
- **CustomersPage**: Handles customers table interactions
- **OpenAccountPage**: Handles account opening form

**Customer Pages:**
- **CustomerDashboardPage**: Customer dashboard with account selection and balance
- **DepositPage**: Handles deposit form interactions
- **TransactionsPage**: Handles transactions table interactions

### Business Flows

The framework uses Flow classes to encapsulate complete business workflows, making tests more readable and reusable:

- **CreateCustomerFlow**: Complete customer creation and verification workflow
- **OpenAccountFlow**: Complete account opening and verification workflow
- **TransactionFlow**: Complete deposit/transaction workflow with balance and transaction verification

### Fixtures

Playwright fixtures provide reusable setup code:
- **bank-manager-login**: Automatically logs in as bank manager for tests
- **customer-login**: Automatically logs in as customer (configurable customer name)

## Test Data Management

The `DataGenerator` utility (using Faker.js) generates realistic test data:
- **generateCustomerData()**: Generates unique customer data (firstName, lastName, postCode)
- **generateDepositAmount()**: Generates random deposit amounts (default: $10-$1000)
- **generateDepositAmounts(count)**: Generates multiple random deposit amounts

## Configuration

The `playwright.config.ts` file contains:
- Base URL configuration
- Browser projects (Chromium, Firefox, WebKit)
- Timeout settings
- Screenshot and video capture on failure
- Trace collection on retry

## Reporting

Test reports are generated in multiple formats:

### HTML Report
```bash
npm run test:report
```

### Allure Report
Allure results are generated in `allure-results/` directory. To view:
```bash
allure serve allure-results
```

