import { test, expect } from '../../fixtures/bank-manager-login';
import { OpenAccountFlow } from '../../flows/open-account-flow';
import { CustomerData, DataGenerator } from '../../helpers/data-generator';
import { AddCustomerPage } from '../../pages/bank-manager/add-customer-page';
import { OpenAccountPage } from '../../pages/bank-manager/open-account-page';
import { CustomersPage } from '../../pages/bank-manager/customers-page';

test.describe('Bank Manager Operations: Open new account', async () => {
  let openAccountFlow: OpenAccountFlow;
  let customerData: CustomerData;

  test.beforeEach(async ({ bankManagerLogin, page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersPage = new CustomersPage(page);

    openAccountFlow = new OpenAccountFlow(openAccountPage, customersPage);

    await test.step('Given bank manager logged in and a customer exists', async () => {
      await expect(addCustomerPage.addCustomerButton, 'Bank manager should be logged in').toBeVisible();

      // Create a customer first to have an existing customer
      customerData = DataGenerator.generateCustomerData();
      await addCustomerPage.clickAddCustomerButton();
      const customerAddedMessage = await addCustomerPage.createCustomer(customerData);
      expect(customerAddedMessage).toContain('Customer added successfully');
    });
  });

  test('Open new account for existing customer', async () => {
    let accountNumber: string;
    const customerFullName = `${customerData.firstName} ${customerData.lastName}`;

    await test.step('When I open a new account for the customer', async () => {
      accountNumber = await openAccountFlow.openAccount(customerFullName, 'Pound');
    });

    await test.step('Then the success message should be displayed with account number', async () => {
      // Validation is already done in openAccount flow
      expect(accountNumber).toBeTruthy();
    });

    await test.step('And the customer record in the Customers table should be updated with the new account number', async () => {
      await openAccountFlow.verifyAccount(customerData, accountNumber);
    });
  });

  test('Open multiple new accounts for existing customer', async () => {
    let accountNumber1: string, accountNumber2: string;
    
    const customerFullName = `${customerData.firstName} ${customerData.lastName}`;

    await test.step('When I open multiple new accounts for the customer', async () => {
        accountNumber1 = await openAccountFlow.openAccount(customerFullName, 'Pound');
        accountNumber2 = await openAccountFlow.openAccount(customerFullName, 'Pound');
    });

    await test.step('And the customer record in the Customers table should be updated with the new account numbers', async () => {
      await openAccountFlow.verifyAccount(customerData, `${accountNumber1} ${accountNumber2}`);
    });
  });

  test('Open multiple new accounts with different currencies for existing customer', async () => {
    let accountNumber1: string, accountNumber2: string,accountNumber3: string;
    const customerFullName = `${customerData.firstName} ${customerData.lastName}`;

    await test.step('When I open multiple new accounts with different currencies for the customer', async () => {
        accountNumber1 = await openAccountFlow.openAccount(customerFullName, 'Pound');
        accountNumber2 = await openAccountFlow.openAccount(customerFullName, 'Rupee');
        accountNumber3 = await openAccountFlow.openAccount(customerFullName, 'Dollar');
    });

    await test.step('And the customer record in the Customers table should be updated with the new account numbers', async () => {
      await openAccountFlow.verifyAccount(customerData, `${accountNumber1} ${accountNumber2} ${accountNumber3}`);
    });
  });
});
