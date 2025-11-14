import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Bank Manager Login Fixture
 * Provides a reusable fixture for bank login that can be used across all bank manager-related tests
 */
type BankMangerLoginFixture = {
  bankManagerLogin: LoginPage;
};

/**
 * Extended test with bank manager login fixture
 * Usage: test('...', async ({ loginPage }) => { ... })
 */
export const test = base.extend<BankMangerLoginFixture>({
  /**
   * LoginPage instance
   */
  bankManagerLogin: async ({ page }, use) => {
    const bankManagerLogin = new LoginPage(page);
    await bankManagerLogin.navigateToLogin();
    await bankManagerLogin.clickBankManagerLogin();
    await use(bankManagerLogin);
  }
});

export { expect } from '@playwright/test';

