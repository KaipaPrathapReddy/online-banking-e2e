import { Page, Locator } from '@playwright/test';
import { UIHelpers } from '../helpers/ui-helpers';

/**
 * Base Page Object Model class
 * Provides common functionality for all page objects
 */
export abstract class BasePage {
  readonly page: Page;
  private readonly bankLogo: Locator;
  private readonly homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bankLogo = page.getByText('XYZ Bank');
    this.homeButton = page.getByText('Home');
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
 * Click Home button
 */
  async clickHome(): Promise<void> {
    await UIHelpers.clickElement(this.page, this.homeButton);
  }

  abstract isPageLoaded(): Promise<boolean>;
}

