import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UIHelpers } from '../helpers/ui-helpers';
import { CustomWaits } from '../helpers/custom-waits';

/**
 * Login Page Object Model
 * Handles interactions with the login page
 */
export class LoginPage extends BasePage {
  // Selectors - will be updated after exploring the actual page
  private readonly customerLoginButton: Locator;
  private readonly bankManagerLoginButton: Locator;
  private readonly userSelect: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.customerLoginButton = page.getByText('Customer Login');
    this.bankManagerLoginButton = page.getByText('Bank Manager Login');
    this.userSelect = page.locator('#userSelect');
    this.loginButton = page.getByText('Login');
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('');
    await CustomWaits.waitForPageLoad(this.page);
  }

  /**
   * Click Bank Manager Login button
   */
  async clickBankManagerLogin(): Promise<void> {
    await UIHelpers.clickElement(this.page, this.bankManagerLoginButton);
  }

  /**
 * Navigate to the login page
 */
  async loginAsCustomer(customerName: string): Promise<void> {
    await UIHelpers.clickElement(this.page, this.customerLoginButton);
    await UIHelpers.selectOption(this.userSelect, customerName);
    await UIHelpers.clickElement(this.page, this.loginButton);
  }

  async isPageLoaded(): Promise<boolean> {
    return await UIHelpers.isElementVisible(this.customerLoginButton);
  }
}

