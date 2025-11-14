import { Locator, Page } from "playwright/test";
import { BasePage } from "../BasePage";
import { UIHelpers } from "../../helpers/ui-helpers";
import { CustomWaits } from "../../helpers/custom-waits";

export class CustomerDashboardPage extends BasePage {
    readonly depositButton: Locator;
    private readonly withdrawButton: Locator;
    private readonly transactionsButton: Locator;
    private readonly welcomeMessage: Locator;
    readonly openAccountMessage: Locator;
    private readonly accountSelect: Locator;
    private readonly balanceDisplay: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountSelect = page.locator('#accountSelect');
        this.depositButton = page.getByText('Deposit').first();
        this.withdrawButton = page.getByText('Withdrawl');
        this.transactionsButton = page.getByText('Transactions');
        this.welcomeMessage = page.getByText('Welcome');
        this.openAccountMessage = page.getByText('Please open an account with us.');
        this.balanceDisplay = page.locator("//text()[contains(., 'Balance')]/following-sibling::*[1]");
        this.logoutButton = this.page.getByText('Logout');
    }

    async isPageLoaded(): Promise<boolean> {
        await CustomWaits.waitForElement(this.depositButton);
        return await UIHelpers.isElementVisible(this.depositButton);
    }

    async clickDepositButton(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.depositButton);
    }

    async clickWithdrawButton(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.withdrawButton);
    }

    async clickTransactionsButton(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.transactionsButton);
    }

    async isWelcomeMessageDisplayed(): Promise<boolean> {
        return await this.welcomeMessage.isVisible();
    }

    async isCustomerNameDisplayed(customerName: string): Promise<boolean> {
        return await this.welcomeMessage.filter({ hasText: customerName }).isVisible();
    }

    /**
     * * Select account from dropdown
     * * @param accountNumber - Account number to select
     * */
    async selectAccount(accountNumber: string): Promise<void> {
        await UIHelpers.selectOption(this.accountSelect, accountNumber);
    }

    /**
     * * Get current account balance
     * * @returns Balance as string or empty string if not found
     * */
    async getBalance(): Promise<string> {
        return await UIHelpers.getElementText(this.balanceDisplay);
    }

    /**
     * * Get account number from dropdown
     * @param accountIndex - Account index to get
     * @returns Account number as string
     */
    async getAccountNumber(accountIndex: number): Promise<string> {
        return await UIHelpers.getElementText(await UIHelpers.getDropdownOption(this.accountSelect, accountIndex));
    }

    async logout(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.logoutButton);
    }
}