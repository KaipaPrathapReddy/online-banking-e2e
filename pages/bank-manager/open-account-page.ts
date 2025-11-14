import { Page, Locator } from '@playwright/test';
import { ManagerGlobalFields } from './manager-global-fields';
import { UIHelpers } from '../../helpers/ui-helpers';
import { CustomWaits } from '../../helpers/custom-waits';

/**
 * Open Account Page Object Model
 * Handles interactions with the Open Account form
 */
export class OpenAccountPage extends ManagerGlobalFields {
  // Form field selectors
  private readonly customerSelect: Locator;
  private readonly currencySelect: Locator;
  private readonly processButton: Locator;

  constructor(page: Page) {
    super(page);
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByText('Process');
  }

  async isPageLoaded(): Promise<boolean> {
      await CustomWaits.waitForElement(this.processButton);
      return await UIHelpers.isElementVisible(this.processButton);
  }

  /**
   * Open an account for a customer
   * @param customerName - The customer name to open account for
   * @param currency - The currency for the account (e.g., 'Dollar', 'Pound', 'Rupee')
   * @returns The alert message containing account number
   */
  async openAccount(customerName: string, currency: string): Promise<string> {
    await UIHelpers.selectOption(this.customerSelect, customerName);
    await UIHelpers.selectOption(this.currencySelect, currency);
    const alertMessage= UIHelpers.waitForAlert(this.page);
    await UIHelpers.clickElement(this.page, this.processButton);
    return await alertMessage;
  }

  /**
   * Extract account number from success message
   * @param message - The alert message
   * @returns The account number or null if not found
   */
  async extractAccountNumber(message: string): Promise<string | null> {
    const match = message.match(/account number\s*:?\s*(\d+)/i);
    return match ? match[1] : null;
  }
}