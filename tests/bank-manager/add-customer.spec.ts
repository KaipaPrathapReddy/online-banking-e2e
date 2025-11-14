import { test, expect } from '../../fixtures/bank-manager-login';
import { CreateCustomerFlow } from '../../flows/create-customer-flow';
import { CustomerData, DataGenerator } from '../../helpers/data-generator';
import { AddCustomerPage } from '../../pages/bank-manager/add-customer-page';
import { CustomersPage } from '../../pages/bank-manager/customers-page';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Bank Manager Operations: Create new customer', async () => {
  let createCustomerFlow: CreateCustomerFlow;
  let customersPage: CustomersPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ bankManagerLogin, page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customersPageInstance = new CustomersPage(page);
    loginPage = new LoginPage(page);

    createCustomerFlow = new CreateCustomerFlow(addCustomerPage, customersPageInstance);
    customersPage = customersPageInstance;
  });

  test('Add new customer', async ({ bankManagerLogin, page }) => {
    await test.step('Given bank manager logged in', async () => {
      const addCustomerPage = new AddCustomerPage(page);
      await expect(addCustomerPage.addCustomerButton, 'Bank manager should be logged in').toBeVisible();
    });

    const customerData: CustomerData = DataGenerator.generateCustomerData();
    let customerId: string;

    await test.step('When I add a new customer', async () => {
      customerId = await createCustomerFlow.createCustomer(customerData);
    });

    await test.step('Then the customer should be added to the customers table', async () => {
      await createCustomerFlow.verifyCustomer(customerData);
    });

    await test.step('And customer should be able to login application', async () => {
      await customersPage.clickHome();
      const customerFullName = createCustomerFlow.getCustomerFullName(customerData);
      await loginPage.loginAsCustomer(customerFullName);
      expect(
        await customersPage.isCustomerFound(customerData.firstName),
        'Customer should not be found in the customers table'
      ).toBeFalsy();
    });
  });
});
