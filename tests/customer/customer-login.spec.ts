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
