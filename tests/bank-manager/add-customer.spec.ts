import { test, expect } from '../../fixtures/bank-manager-login';
import { CustomersPage, CustomerTableRow } from '../../pages/bank-manager/customers-page';
import { CustomerData, DataGenerator } from '../../helpers/data-generator';
import { AddCustomerPage } from '../../pages/bank-manager/add-customer-page';
import { ManagerGlobalFields } from '../../pages/bank-manager/manager-global-fields';

test.describe('Bank Manager Operations: Create new customer', async () => {
  let addCustomerPage: AddCustomerPage;
  let customersPage: CustomersPage;

  test.beforeEach(async ({ page }) => {
    addCustomerPage = new AddCustomerPage(page);
    customersPage = new CustomersPage(page);
  })

  test('Add new customer', async ({ bankManagerLogin, page }) => {
    await test.step('Given bank manager logged in', async () => {
      await expect(addCustomerPage.addCustomerButton, 'Bank manager should be logged in').toBeVisible();
    });

    const customerData: CustomerData = DataGenerator.generateCustomerData();
    await test.step('When I add a new customer', async () => {
      await addCustomerPage.clickAddCustomerButton();
      const customerAddedMessage: string = await addCustomerPage.createCustomer(customerData);
      expect(customerAddedMessage).toContain('Customer added successfully');
    });

    await test.step('Then the customer should be added to the customers table', async () => {
      await customersPage.clickCustomersButton();
      await customersPage.searchCustomer(customerData.firstName);
      expect(await customersPage.isCustomerFound(customerData.firstName), 'Customer should be found in the customers table').toBeTruthy();

      const actualCustomerData: CustomerTableRow = await customersPage.getCustomerData(customerData.firstName);
      expect(actualCustomerData.firstName).toBe(customerData.firstName);
      expect(actualCustomerData.lastName).toBe(customerData.lastName);
      expect(actualCustomerData.postCode).toBe(customerData.postCode);
    });
  })
});
