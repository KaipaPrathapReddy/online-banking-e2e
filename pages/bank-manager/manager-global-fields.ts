import { Locator, Page } from "playwright/test";
import { BasePage } from "../BasePage";
import { CustomWaits } from "../../helpers/custom-waits";
import { UIHelpers } from "../../helpers/ui-helpers";

export class ManagerGlobalFields extends BasePage {

    readonly addCustomerButton: Locator;
    private readonly openAccountButton: Locator;
    private readonly customersButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addCustomerButton = page.getByText('Add Customer');
        this.openAccountButton = page.getByText('Open Account');
        this.customersButton = page.getByText('Customers');
    }

    async isPageLoaded(): Promise<boolean> {
        await CustomWaits.waitForElement(this.addCustomerButton);
        return await UIHelpers.isElementVisible(this.addCustomerButton);
    }

    async clickAddCustomerButton(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.addCustomerButton);
    }

    async clickOpenAccountButton(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.openAccountButton);
    }

    async clickCustomersButton(): Promise<void> {
        await UIHelpers.clickElement(this.page, this.customersButton);
    }
}