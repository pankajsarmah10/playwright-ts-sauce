import { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage {
  private page: Page;
  private checkoutOverviewHeader: Locator;
  private overviewCartItems: Locator;
  private finishButton: Locator;
  private overviewItemName: string;
  private overviewItemDescription: string;
  private overviewItemPrice: string;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewHeader = page.getByText(/Checkout: Overview/);
    this.overviewCartItems = page.locator(".cart_item");
    this.finishButton = page.getByRole("link", { name: "FINISH" });
    this.overviewItemName = ".inventory_item_name";
    this.overviewItemDescription = ".inventory_item_desc";
    this.overviewItemPrice = ".inventory_item_price";
  }

  /**
   * Wait for Checkout Overview page to load
   */
  async waitForPageLoad() {
    await this.checkoutOverviewHeader.waitFor({ state: "visible" });
  }

  /**
   * Gets the count of items in the Cart VOerview page
   * @returns Cart item count
   */
  async getOverviewCartItemCount(): Promise<number> {
    return await this.overviewCartItems.count();
  }

  /**
   * Get the title of the inventory item
   * @param index Item index
   * @returns Item title
   */
  async getItemTitle(index: number): Promise<string | null> {
    return await this.overviewCartItems
      .nth(index)
      .locator(this.overviewItemName)
      .textContent();
  }

  /**
   * Get the description of the inventory item
   * @param index Item index
   * @returns Item description
   */
  async getItemDescription(index: number): Promise<string | null> {
    return await this.overviewCartItems
      .nth(index)
      .locator(this.overviewItemDescription)
      .textContent();
  }

  /**
   * Get the price of the inventory item
   * @param index Item index
   * @returns Item price
   */
  async getItemPrice(index: number): Promise<string | null> {
    return await this.overviewCartItems
      .nth(index)
      .locator(this.overviewItemPrice)
      .textContent();
  }

  /**
   * Click on Finish button
   */
  async finishCheckout() {
    await this.finishButton.click();
  }
}
