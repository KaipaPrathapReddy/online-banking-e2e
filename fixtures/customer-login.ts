import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Customer Login Fixture
 * Provides a reusable fixture for customer login that can be used across all customer-related tests
 */

type CustomerLoginFixture = {
  customerLogin: LoginPage;
  customerName: string;
};

/**
 * Default customer name to use if not specified
 */
const DEFAULT_CUSTOMER_NAME = 'Harry Potter';

/**
 * Extended test with customer login fixture
 * Usage: test('...', async ({ loginPage }) => { ... })
 */
export const test = base.extend<CustomerLoginFixture>({
  /**
   * Customer name to use for login
   * Can be overridden in test options
   */
  customerName: [DEFAULT_CUSTOMER_NAME, { option: true }],

  /**
   * LoginPage instance
   */
  customerLogin: async ({ page ,customerName}, use) => {
    const customerLogin = new LoginPage(page);
    await customerLogin.navigateToLogin();
    await customerLogin.loginAsCustomer(customerName);
    await use(customerLogin);
    await customerLogin.logout();
  }
});

export { expect } from '@playwright/test';

