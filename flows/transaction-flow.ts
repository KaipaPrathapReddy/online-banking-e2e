import { expect } from '@playwright/test';
import { CustomerDashboardPage } from '../pages/customer/customer-dashboard-page';
import { DepositPage } from '../pages/customer/deposit-page';
import { TransactionsPage } from '../pages/customer/transactions-page';
import { UIHelpers } from '../helpers/ui-helpers';

/**
 * Deposit Flow
 * Encapsulates complete business workflows for deposit operations
 */
export class TransactionFlow {
  constructor(
    private dashboardPage: CustomerDashboardPage,
    private depositPage: DepositPage,
    private transactionsPage: TransactionsPage
  ) { }

  /**
   * Complete flow: Get account and initial balance
   * Verifies customer has account, gets account number, selects it, and retrieves balance
   * @param accountIndex - Index of account to select (default: 0)
   * @returns Object with accountNumber and initialBalance
   */
  async getAccountAndBalance(accountIndex: number = 0): Promise<{ accountNumber: string, initialBalance: string }> {
    // Verify customer has an account
    expect(
      await UIHelpers.isElementVisible(this.dashboardPage.openAccountMessage),
      'Customer should have an account'
    ).toBeFalsy();

    // Get account number from dropdown
    const accountNumber = await this.dashboardPage.getAccountNumber(accountIndex);
    expect(accountNumber, 'Account number should be available').toBeTruthy();

    // Select account and get initial balance
    await this.dashboardPage.selectAccount(accountNumber);
    const initialBalance = await this.dashboardPage.getBalance();
    expect(initialBalance, 'Initial balance should be available').toBeTruthy();

    return { accountNumber, initialBalance };
  }

  /**
   * Complete flow: Make a deposit
   * Navigates to deposit page, makes deposit, and validates success message
   * @param accountNumber - Account number to deposit to
   * @param amount - Amount to deposit
   */
  async makeDeposit(accountNumber: string, amount: string): Promise<void> {
    await this.dashboardPage.clickDepositButton();
    expect(await this.depositPage.isPageLoaded(), 'Deposit page should be loaded').toBeTruthy();

    await this.depositPage.makeDeposit(accountNumber, amount);

    // Validate success message
    const successMessage = await this.depositPage.getSuccessMessage();
    expect(successMessage, 'Success message should contain "Deposit Successful"').toContain('Deposit Successful');
  }

  /**
   * Complete flow: Verify deposit success message
   * @returns Success message text
   */
  async verifyDepositSuccess(): Promise<string> {
    const successMessage = await this.depositPage.getSuccessMessage();
    expect(successMessage, 'Success message should contain "Deposit Successful"').toContain('Deposit Successful');
    return successMessage;
  }

  /**
   * Complete flow: Verify balance update after deposit
   * @param initialBalance - Initial balance before deposit
   * @param depositAmount - Amount that was deposited
   */
  async verifyBalanceUpdate(initialBalance: string, depositAmount: string): Promise<void> {
    const updatedBalance = await this.dashboardPage.getBalance();
    const expectedBalance = (parseInt(initialBalance) + parseInt(depositAmount)).toString();
    expect(updatedBalance.trim(), 'Balance should be updated correctly').toBe(expectedBalance);
  }

  async openTransactions(): Promise<void>{
    await this.dashboardPage.clickTransactionsButton();
    expect(await this.transactionsPage.isPageLoaded(), 'Transactions page should be loaded').toBeTruthy();
  }
  
  /**
   * Complete flow: Verify transaction in transactions table
   * Navigates to transactions page and verifies transaction exists
   * @param amount - Expected transaction amount
   * @param transactionType - Expected transaction type (default: 'Credit')
   */
  async verifyTransaction(amount: string, transactionType: string = 'Credit'): Promise<void> {
    const transactionFound = await this.transactionsPage.verifyTransaction(amount, transactionType);
    expect(transactionFound, `Transaction for amount ${amount} with type ${transactionType} should be found`).toBeTruthy();
  }

  /**
   * Complete flow: Make deposit and verify all aspects
   * Combines makeDeposit, verifyDepositSuccess, verifyBalanceUpdate, and verifyTransaction
   * @param accountNumber - Account number to deposit to
   * @param amount - Amount to deposit
   * @param initialBalance - Initial balance before deposit
   */
  async makeDepositAndVerify(accountNumber: string, amount: string, initialBalance: string): Promise<void> {
    await this.makeDeposit(accountNumber, amount);
    await this.verifyBalanceUpdate(initialBalance, amount);
    await this.verifyTransaction(amount, 'Credit');
  }
}

