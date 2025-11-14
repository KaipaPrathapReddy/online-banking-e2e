import { expect } from '@playwright/test';
import { AddCustomerPage } from '../pages/bank-manager/add-customer-page';
import { CustomersPage, CustomerTableRow } from '../pages/bank-manager/customers-page';
import { CustomerData } from '../helpers/data-generator';

/**
 * Create Customer Flow
 * Encapsulates complete business workflows for customer operations
 */
export class CreateCustomerFlow {
  constructor(
    private addCustomerPage: AddCustomerPage,
    private customersPage: CustomersPage
  ) { }

  /**
   * Complete flow: Create a new customer
   * Handles navigation, form filling, submission, validation, and returns customer ID
   * @param customerData - Customer data to create
   * @returns Customer ID extracted from success message
   */
  async createCustomer(customerData: CustomerData): Promise<string> {
    await this.addCustomerPage.clickAddCustomerButton();
    const customerAddedMessage = await this.addCustomerPage.createCustomer(customerData);

    // Validate success message
    expect(customerAddedMessage).toContain('Customer added successfully');
    expect(customerAddedMessage).toMatch(/customer id\s*:?\s*\d+/i);

    // Extract customer ID
    const customerId = customerAddedMessage.match(/customer id\s*:?\s*(\d+)/i);
    expect(customerId).not.toBeNull();
    return customerId![1];
  }

  /**
   * Complete flow: Verify customer in customers table
   * Navigates to customers table, searches, and validates customer data
   * @param customerData - Customer data to verify
   * @returns Customer table row data
   */
  async verifyCustomer(customerData: CustomerData): Promise<void> {
    await this.customersPage.clickCustomersButton();
    await this.customersPage.searchCustomer(customerData.firstName);

    expect(
      await this.customersPage.isCustomerFound(customerData.firstName),
      'Customer should be found in the customers table'
    ).toBeTruthy();

    const actualCustomerData = await this.customersPage.getCustomerData(customerData.firstName);

    // Verify customer data matches
    expect(actualCustomerData.firstName).toBe(customerData.firstName);
    expect(actualCustomerData.lastName).toBe(customerData.lastName);
    expect(actualCustomerData.postCode).toBe(customerData.postCode);
  }

  /**
   * Helper: Get customer full name
   * @param customerData - Customer data
   * @returns Full name as "FirstName LastName"
   */
  getCustomerFullName(customerData: CustomerData): string {
    return `${customerData.firstName} ${customerData.lastName}`;
  }
}
