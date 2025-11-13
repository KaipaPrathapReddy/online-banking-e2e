import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ManagerGlobalFields } from './manager-global-fields';
import { UIHelpers } from '../../helpers/ui-helpers';
import { CustomerData } from './add-customer-page';

/**
 * Customers Table Page Object Model
 * Handles interactions with the Customers table/view
 */
export interface CustomerTableRow {
  firstName: string;
  lastName: string;
  postCode: string;
  accountNumber: string;
}

export class CustomersPage extends ManagerGlobalFields {
  readonly searchCustomerInput: Locator;
  readonly customersTableRows: Locator;

  constructor(page: Page) {
    super(page);
    // AngularJS table selectors
    this.searchCustomerInput = page.locator('input[ng-model="searchCustomer"]').first();
    this.customersTableRows = page.locator('tr[ng-repeat*="cust"]');
  }

  async isPageLoaded(): Promise<boolean> {
    return await UIHelpers.isElementVisible(this.searchCustomerInput);
  }

  async searchCustomer(customerName: string): Promise<void> {
    await this.searchCustomerInput.fill(customerName);
  }

  async isCustomerFound(customerName: string): Promise<boolean> {
    return (await this.getCustomerRow(customerName)).isVisible();
  }

  async getCustomerRow(customerName: string): Promise<Locator> {
    return this.customersTableRows.filter({ hasText: customerName });
  }

  async getCustomerData(customerName: string): Promise<CustomerTableRow> {
    const customerRow = await this.getCustomerRow(customerName);

    let customerData: CustomerTableRow = {
      firstName: customerName,
      lastName: await customerRow.locator('//td[2]').textContent() || '',
      postCode: await customerRow.locator('//td[3]').textContent() || '',
      accountNumber: await customerRow.locator('//td[4]').textContent() || '',
    };

    return customerData;
  }

  async deleteCustomer(customerName: string): Promise<void> {
    const customerRow = await this.getCustomerRow(customerName);
    await UIHelpers.clickElement(this.page, customerRow.locator('//td[5]/button'));
  }
}

