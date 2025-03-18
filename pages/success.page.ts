import { Page, Locator } from "@playwright/test";

export class SuccessPage {
  private page: Page;
  private finishHeader: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishHeader = page.getByText(/Finish/);
    this.successMessage = page.locator(".complete-header");
  }

  /**
   * Wait for Success page to load
   */
  async waitForPageLoad() {
    await this.finishHeader.waitFor({ state: "visible" });
  }

  /**
   * Get Success Message
   * @returns Success message
   */
  async getSucccessMessage(): Promise<string | null> {
    return await this.successMessage.textContent();
  }
}
