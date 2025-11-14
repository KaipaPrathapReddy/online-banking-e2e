import { expect } from '@playwright/test';
import { OpenAccountPage } from '../pages/bank-manager/open-account-page';
import { CustomersPage, CustomerTableRow } from '../pages/bank-manager/customers-page';
import { CustomerData } from '../helpers/data-generator';

/**
 * Open Account Flow
 * Encapsulates complete business workflows for account operations
 */
export class OpenAccountFlow {
  constructor(
    private openAccountPage: OpenAccountPage,
    private customersPage: CustomersPage
  ) { }

  /**
   * Complete flow: Open an account for a customer
   * Handles navigation, account creation, validation, and returns account number
   * @param customerName - Full name of the customer (e.g., "John Doe")
   * @param currency - Currency for the account (e.g., 'Dollar', 'Pound', 'Rupee')
   * @returns Account number
   */
  async openAccount(customerName: string, currency: string): Promise<string> {
    await this.openAccountPage.clickOpenAccountButton();
    expect(await this.openAccountPage.isPageLoaded()).toBeTruthy();

    const accountCreatedMessage = await this.openAccountPage.openAccount(customerName, currency);

    // Validate success message
    expect(accountCreatedMessage).toContain('Account created successfully');
    expect(accountCreatedMessage).toMatch(/account number\s*:?\s*\d+/i);

    // Extract and validate account number
    const accountNumber = await this.openAccountPage.extractAccountNumber(accountCreatedMessage);
    expect(accountNumber).not.toBeNull();
    expect(accountNumber).toBeTruthy();
    expect(Number(accountNumber)).toBeGreaterThan(0);

    return accountNumber!;
  }

  /**
   * Complete flow: Verify account in customers table
   * Navigates to customers table, searches, and validates customer data and account number
   * @param customerData - Customer data to verify
   * @param expectedAccountNumber - Expected account number (optional)
   * @returns Customer table row data
   */
  async verifyAccount(
    customerData: CustomerData,
    expectedAccountNumber?: string
  ): Promise<void> {
    await this.customersPage.clickCustomersButton();
    await this.customersPage.searchCustomer(customerData.firstName);

    expect(
      await this.customersPage.isCustomerFound(customerData.firstName),
      'Customer should be found in the customers table'
    ).toBeTruthy();

    const accountNumber = (await this.customersPage.getCustomerData(customerData.firstName)).accountNumber.trim();
    expect(accountNumber).toBe(expectedAccountNumber);

  }
}

