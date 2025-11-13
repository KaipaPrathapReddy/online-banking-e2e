import { Locator } from "playwright/test";

export class CustomWaits {
    static async waitForElement(locator: Locator){
        await locator.waitFor();
    }

    static async waitForPageLoad(page: Page): Promise<void> {
        await page.waitForLoadState('networkidle');
    }
}