import { test, expect } from '../../fixtures/customer-login';
import { TransactionFlow } from '../../flows/transaction-flow';
import { CustomerDashboardPage } from '../../pages/customer/customer-dashboard-page';
import { DepositPage } from '../../pages/customer/deposit-page';
import { TransactionsPage } from '../../pages/customer/transactions-page';
import { DataGenerator } from '../../helpers/data-generator';

test.describe('Bank Customer Operations: Make a deposit', async () => {
    let transactionFlow: TransactionFlow;
    let dashboardPage: CustomerDashboardPage;
    let depositPage: DepositPage;
    let transactionsPage: TransactionsPage;

    test.beforeEach(async ({ page }) => {
        dashboardPage = new CustomerDashboardPage(page);
        depositPage = new DepositPage(page);
        transactionsPage = new TransactionsPage(page);

        transactionFlow = new TransactionFlow(dashboardPage, depositPage, transactionsPage);
    });

    test.use({ customerName: 'Ron Weasly' })
    test('Make successful deposit to existing account', async ({ customerLogin }) => {
        await test.step('Given customer is logged in', async () => {
            expect(await dashboardPage.isPageLoaded(), 'Dashboard page should be loaded').toBeTruthy();
        });

        let accountNumber: string;
        let initialBalance: string;
        const depositAmount = DataGenerator.generateDepositAmount();

        await test.step('And customer has an existing account', async () => {
            const accountData = await transactionFlow.getAccountAndBalance(0);
            accountNumber = accountData.accountNumber;
            initialBalance = accountData.initialBalance;
        });

        await test.step('When I make a deposit', async () => {
            await transactionFlow.makeDeposit(accountNumber, depositAmount);
        });

        await test.step('Then the success message "Deposit Successful" should be displayed', async () => {
            await transactionFlow.verifyDepositSuccess();
        });

        await test.step('And the account balance should be updated accordingly', async () => {
            await transactionFlow.verifyBalanceUpdate(initialBalance, depositAmount);
        });

        await test.step('And a new record should be added to the Transactions table with Transaction Type = Credit', async () => {
            await transactionFlow.openTransactions();
            await transactionFlow.verifyTransaction(depositAmount, 'Credit');
        });
    });

    test.use({ customerName: 'Hermoine Granger' })
    test('Validate empty amount field shows tooltip', async ({ customerLogin }) => {
        await test.step('Given customer is logged in', async () => {
            expect(await dashboardPage.isPageLoaded(), 'Dashboard page should be loaded').toBeTruthy();
        });

        let accountNumber: string;

        await test.step('And customer has an existing account', async () => {
            const accountData = await transactionFlow.getAccountAndBalance(0);
            accountNumber = accountData.accountNumber;
        });

        await test.step('When I navigate to deposit page and submit empty amount', async () => {
            await dashboardPage.clickDepositButton();
            const depositPage = new DepositPage(dashboardPage.page);
            expect(await depositPage.isPageLoaded(), 'Deposit page should be loaded').toBeTruthy();

            await dashboardPage.selectAccount(accountNumber);
            // Leave amount field empty
            await depositPage.clickDeposit();
        });

        await test.step('Then the tooltip "Please fill in this field." should be displayed', async () => {
            const depositPage = new DepositPage(dashboardPage.page);
            const validationMessage = await depositPage.amountInput.evaluate((el: HTMLInputElement) => {
                return el.validationMessage || '';
            });

            expect(validationMessage, 'Validation message should be displayed').toBe('Please fill in this field.');
        });
    });

    test.use({ customerName: 'Harry Potter' })
    test('Make multiple deposits and verify all transactions', async ({ customerLogin }) => {
        await test.step('Given customer is logged in', async () => {
            expect(await dashboardPage.isPageLoaded(), 'Dashboard page should be loaded').toBeTruthy();
        });

        let accountNumber: string;
        let initialBalance: string;
        const depositAmounts = DataGenerator.generateDepositAmounts(3);

        await test.step('And customer has an existing account', async () => {
            const accountData = await transactionFlow.getAccountAndBalance(0);
            accountNumber = accountData.accountNumber;
            initialBalance = accountData.initialBalance;
        });

        await test.step('When I make multiple deposits and verify transaction of each deposit', async () => {
            // Make first deposit and verify balance and transaction
            const depositAmount1: string = depositAmounts[0];
            await transactionFlow.makeDeposit(accountNumber, depositAmount1);
            await transactionFlow.verifyBalanceUpdate(initialBalance, depositAmount1);

            await transactionFlow.openTransactions();
            await transactionsPage.sortTrasactionsByDate();
            await transactionFlow.verifyTransaction(depositAmount1, 'Credit');
            await transactionsPage.goBackToDashboard();

            // Make second deposit and verify balance and transaction
            const depositAmount2: string = depositAmounts[1];
            const balanceAfterDeposit1 = await dashboardPage.getBalance();
            await transactionFlow.makeDeposit(accountNumber, depositAmount2);
            await transactionFlow.verifyBalanceUpdate(balanceAfterDeposit1, depositAmount2);

            await transactionFlow.openTransactions();
             await transactionsPage.sortTrasactionsByDate();
            await transactionFlow.verifyTransaction(depositAmount2, 'Credit');
            await transactionsPage.goBackToDashboard();

            // Make second deposit and verify balance and transaction
            const depositAmount3: string = depositAmounts[2];
            const balanceAfterDeposit2 = await dashboardPage.getBalance();
            await transactionFlow.makeDeposit(accountNumber, depositAmount3);
            await transactionFlow.verifyBalanceUpdate(balanceAfterDeposit2, depositAmount3);

            await transactionFlow.openTransactions();
             await transactionsPage.sortTrasactionsByDate();
            await transactionFlow.verifyTransaction(depositAmount3, 'Credit');
        });
    });

    test.afterEach(async ({ page }) => {
        await dashboardPage.logout();
    });
});

