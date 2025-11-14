import { Page, Locator } from '@playwright/test';
import { UIHelpers } from '../../helpers/ui-helpers';
import { CustomWaits } from '../../helpers/custom-waits';
import { CustomerDashboardPage } from './customer-dashboard-page';

/**
 * Deposit Page Object Model
 * Handles interactions with the Deposit form
 */
export class DepositPage extends CustomerDashboardPage {
    readonly amountInput: Locator;
    private readonly submitDeposit: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.amountInput = page.locator('input[ng-model="amount"]').first();
        this.submitDeposit = page.locator('//button[@type="submit"]').getByText('Deposit');
        this.successMessage = page.getByText('Deposit Successful');
    }

    async isPageLoaded(): Promise<boolean> {
        await CustomWaits.waitForElement(this.amountInput);
        return await UIHelpers.isElementVisible(this.amountInput);
    }

    /**
     * Enter deposit amount
     * @param amount - Amount to deposit as string
     */
    async enterAmount(amount: string): Promise<void> {
        await this.amountInput.fill(amount);
    }

    /**
     * Click deposit button
     */
    async clickDeposit(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.submitDeposit);
    }

    /**
     * Get depost success message
     * @returns deposit success message
     */
    async getSuccessMessage(): Promise<string> {
        return await UIHelpers.getElementText(this.successMessage);
    }

    /**
     * Complete deposit flow
     * @param accountNumber - Account number to deposit to
     * @param amount - Amount to deposit
     * @returns Success message text
     */
    async makeDeposit(accountNumber: string, amount: string): Promise<void> {
        await this.selectAccount(accountNumber);
        await this.enterAmount(amount);
        await this.clickDeposit();
        await CustomWaits.waitForElement(this.successMessage);
        await this.page.waitForTimeout(2000);
    }
}

