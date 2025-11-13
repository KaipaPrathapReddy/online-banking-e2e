import { Locator, Page } from "playwright/test";

export class UIHelpers {
    static async clickElement(page: Page, locator: Locator): Promise<void> {
        await locator.click();
        await page.waitForLoadState('networkidle');
    }

    static async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    static async selectOption(locator: Locator, option: string): Promise<void> {
        await locator.selectOption(option);
    }

    /**
   * Get the success message text
   */
    static async handleAlert(page: Page): Promise<string> {
        let alertMessage: string = '';
        // const dialog = await page.waitForEvent('dialog');
        // dialog.message()
        // await dialog.accept();


        // Handle browser alert dialog
        page.on('dialog', async (dialog) => {
            alertMessage = dialog.message();
            console.log('Alert: '+alertMessage)
            await dialog.accept();
        });
        return alertMessage;
    }
}