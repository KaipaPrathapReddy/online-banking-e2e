import { test, expect } from '../../fixtures/customer-login';
import { CustomerDashboardPage } from '../../pages/customer/customer-dashboard-page';

test.describe('Bank Customer Operations', () => {
  let dashboardPage: CustomerDashboardPage;
  
  test.beforeEach(async ({ page }) => {
    dashboardPage = new CustomerDashboardPage(page);
  });

  test.describe('Customer Make Deposit', () => {
    test.use({ customerName: 'Harry Potter' });
    test('Scenario 1: As a customer, I want to make a deposit', async ({ customerLogin }) => {
      test.step('Given: Customer is logged in', async () => {
        expect(await dashboardPage.isPageLoaded(),'Dashboard page should be loaded').toBeTruthy();
      });
    });
  });


//   test('Example 2: Use custom customer name', async ({ loggedInCustomerPage, customerName }) => {
//     // Note: To use custom customer name, use test.use() at suite or test level before the test runs
//     // This example shows the default behavior
//     // Given: Customer is logged in with default name (handled by fixture)

//     // When: Accessing the logged-in page
//     // Then: Customer should be logged in
//     expect(loggedInCustomerPage).toBeTruthy();
//     expect(customerName).toBeTruthy();
//   });

//   test('Example 3: Access login page methods if needed', async ({ loggedInCustomerPage, loginPage }) => {
//     // Given: Customer is logged in (handled by fixture)

//     // When: Accessing login page methods
//     // Then: LoginPage instance should be available
//     expect(loginPage).toBeTruthy();
//     expect(loggedInCustomerPage).toBeTruthy();

//     // You can use loginPage methods if needed for additional operations
//     const pageTitle = await loggedInCustomerPage.title();
//     expect(pageTitle).toBeTruthy();
//   });

//   test('Example 4: Multiple tests with same fixture', async ({ loggedInCustomerPage }) => {
//     // Given: Customer is logged in (handled by fixture)

//     // When: Performing customer operations
//     // Then: All operations should work on logged-in page
//     const url = loggedInCustomerPage.url();
//     expect(url).toBeTruthy();

//     // Verify page is loaded
//     await expect(loggedInCustomerPage).not.toHaveURL(/login/);
//   });
// });

// /**
//  * Example: Using fixture with custom customer name for entire test suite
//  */
// test.describe('Customer Operations with Custom Customer', () => {
//   // Override customer name for all tests in this suite
//   test.use({ customerName: 'Ron Weasley' });

//   test('Test with custom customer from suite level', async ({ loggedInCustomerPage, customerName }) => {
//     // Given: Customer is logged in with custom name from suite level

//     // Then: Customer name should match suite-level override
//     expect(customerName).toBe('Ron Weasley');
//     expect(loggedInCustomerPage).toBeTruthy();

//     // Verify we're on a customer page
//     const currentUrl = loggedInCustomerPage.url();
//     expect(currentUrl).not.toContain('/login');
//   });

//   test('Another test with same custom customer', async ({ loggedInCustomerPage, customerName }) => {
//     // This test also uses Ron Weasley from suite-level override
//     expect(customerName).toBe('Ron Weasley');
//     expect(loggedInCustomerPage).toBeTruthy();
//   });
});

