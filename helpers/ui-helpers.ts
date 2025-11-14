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

    static async getDropdownOption(locator: Locator, index: number): Promise<Locator> {
        return locator.locator('option').nth(index);
    }

    static async getElementText(locator: Locator): Promise<string> {
        return await locator.textContent()??'';
    }

    /**
   * Get the success message text
   */
    static async waitForAlert(page: Page): Promise<string> {
        return new Promise((resolve) => {
            page.once('dialog', async (dialog) => {
                const msg = dialog.message();
                await dialog.accept();
                resolve(msg);
            });
        });
    }
}