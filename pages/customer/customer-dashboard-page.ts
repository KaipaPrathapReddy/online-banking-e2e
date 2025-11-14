import { Locator, Page } from "playwright/test";
import { BasePage } from "../BasePage";
import { UIHelpers } from "../../helpers/ui-helpers";
import { CustomWaits } from "../../helpers/custom-waits";

export class CustomerDashboardPage extends BasePage {
    private readonly transactionsButton: Locator;
    private readonly welcomeMessage: Locator;
    private readonly openAccountMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.transactionsButton = page.getByText('Transactions');
        this.welcomeMessage = page.getByText('Welcome');
        this.openAccountMessage = page.getByText('Please open an account with us.');
    }

    async isPageLoaded(): Promise<boolean> {
        await CustomWaits.waitForElement(this.transactionsButton);
        return await UIHelpers.isElementVisible(this.transactionsButton);
    }

    async isWelcomeMessageDisplayed(): Promise<boolean> {
        return await this.welcomeMessage.isVisible();
    }

    async isCustomerNameDisplayed(customerName: string): Promise<boolean> {
        return await this.welcomeMessage.filter({ hasText: customerName }).isVisible();
    }
}