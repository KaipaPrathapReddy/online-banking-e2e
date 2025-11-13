import { Page, Locator } from '@playwright/test';
import { ManagerGlobalFields } from './manager-global-fields';

/**
 * Add Customer Page Object Model
 * Handles interactions with the Add Customer form
 */
export interface CustomerData {
  firstName: string;
  lastName: string;
  postCode: string;
}

export class AddCustomerPage extends ManagerGlobalFields {
  // Form field selectors
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postCodeInput: Locator;
  private readonly messageAlert: Locator;
  private readonly createCustomerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[ng-model="fName"]').first();
    this.lastNameInput = page.locator('input[ng-model="lName"]').first();
    this.postCodeInput = page.locator('input[ng-model="postCd"]').first();
    this.createCustomerButton = page.getByRole('form').getByText('Add Customer');
    this.messageAlert = page.locator('.alert, .message, [ng-show*="message"]');
  }

  /**
   * Create a new customer
   * @param customerData - The customer data to create
   * @returns The customer ID
   */
  async createCustomer(customerData: CustomerData): Promise<string> {
    await this.firstNameInput.fill(customerData.firstName);
    await this.lastNameInput.fill(customerData.lastName);
    await this.postCodeInput.fill(customerData.postCode);
    let alertMessage='';
    this.page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept()
    });
    await this.createCustomerButton.click();
    return alertMessage;
  }
}

