import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { UIHelpers } from '../../helpers/ui-helpers';
import { CustomWaits } from '../../helpers/custom-waits';

/**
 * Transaction Table Row Interface
 */
export interface TransactionRow {
    dateTime: string;
    amount: string;
    transactionType: string;
}

/**
 * Transactions Page Object Model
 * Handles interactions with the Transactions table
 */
export class TransactionsPage extends BasePage {
    private readonly transactionsTable: Locator;
    private readonly transactionRows: Locator;
    private readonly backButton: Locator;
    private readonly sortByDateAndTime: Locator;

    constructor(page: Page) {
        super(page);
        this.transactionsTable = page.locator('//table');
        this.transactionRows = page.locator('tr[ng-repeat*="transactions"]');
        this.backButton = page.getByText('Back');
        this.sortByDateAndTime=this.page.getByRole('link',{name:'Date-Time'});
    }

    async isPageLoaded(): Promise<boolean> {
        await CustomWaits.waitForElement(this.transactionsTable);
        return await UIHelpers.isElementVisible(this.transactionsTable);
    }

    /**
     * Get the latest (most recent) transaction row
     * @returns Locator for the first transaction row
     */
    async getLatestTransactionRow(): Promise<Locator> {
        return this.transactionRows.first();
    }

    /**
     * Get transaction data from a row
     * @param row - Transaction row locator
     * @returns Transaction row data
     */
    async getTransactionData(row: Locator): Promise<TransactionRow> {
        const cells = row.locator('td');
        return {
            dateTime: await cells.nth(0).textContent() || '',
            amount: await cells.nth(1).textContent() || '',
            transactionType: await cells.nth(2).textContent() || ''
        };
    }

    /**
     * Get the latest transaction data
     * @returns Latest transaction data
     */
    async getLatestTransaction(): Promise<TransactionRow> {
        const latestRow = await this.getLatestTransactionRow();
        return await this.getTransactionData(latestRow);
    }

    /**
     * Verify transaction exists with specific amount and type
     * @param amount - Expected transaction amount
     * @param transactionType - Expected transaction type (Credit/Debit)
     * @returns True if transaction found, false otherwise
     */
    async verifyTransaction(amount: string, transactionType: string): Promise<boolean> {
        const count = await this.transactionRows.count();
        
        for (let i = 0; i < count; i++) {
            const row = this.transactionRows.nth(i);
            const transactionData = await this.getTransactionData(row);
            
            if (transactionData.amount.trim() === amount && 
                transactionData.transactionType.trim() === transactionType) {
                return true;
            }
        }
        
        return false;
    }

    async goBackToDashboard(){
        await UIHelpers.clickElement(this.page,this.backButton);
    }

    /**
     * Get all transactions
     * @returns Array of all transaction data
     */
    async getAllTransactions(): Promise<TransactionRow[]> {
        const transactions: TransactionRow[] = [];
        const count = await this.transactionRows.count();
        
        for (let i = 0; i < count; i++) {
            const row = this.transactionRows.nth(i);
            const transactionData = await this.getTransactionData(row);
            transactions.push(transactionData);
        }
        
        return transactions;
    }

    async sortTrasactionsByDate(){
        await UIHelpers.clickElement(this.page,this.sortByDateAndTime);
        this.page.waitForTimeout(1);
    }
}

