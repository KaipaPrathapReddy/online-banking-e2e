import { Locator, Page } from "playwright/test";
import { BasePage } from "../BasePage";
import { UIHelpers } from "../../helpers/ui-helpers";
import { CustomWaits } from "../../helpers/custom-waits";

export class CustomerDashboardPage extends BasePage {
    private readonly transactionsButton: Locator;
    constructor(page: Page) {
        super(page);
        this.transactionsButton = page.getByText('Transactions');
    }

    async isPageLoaded(): Promise<boolean> {
        await CustomWaits.waitForElement(this.transactionsButton);
        return await UIHelpers.isElementVisible(this.transactionsButton);
    }
}