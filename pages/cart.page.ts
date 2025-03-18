import { Page, Locator } from "@playwright/test";

export class CartPage {
  private page: Page;
  private cartPageHeader: Locator;
  private cartItems: Locator;
  private checkoutButton: Locator;
  private cartItemName: string;
  private cartItemDescription: string;
  private cartItemPrice: string;

  constructor(page: Page) {
    this.page = page;
    this.cartPageHeader = page.getByText(/Your Cart/);
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.getByRole("link", { name: "CHECKOUT" });
    this.cartItemName = ".inventory_item_name";
    this.cartItemDescription = ".inventory_item_desc";
    this.cartItemPrice = ".inventory_item_price";
  }

  /**
   * Wait for the Cart Page to load
   */
  async waitForPageLoad() {
    await this.cartPageHeader.waitFor({ state: "visible" });
  }

  /**
   * Gets the number of items added to the cart
   * @returns Cart item count
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Gets the title of the inventory item
   * @param index  Item index
   * @returns Item title
   */
  async getItemTitle(index: number): Promise<string | null> {
    return await this.cartItems
      .nth(index)
      .locator(this.cartItemName)
      .textContent();
  }

  /**
   * Gets the description of the invnetory item
   * @param index Item index
   * @returns Item description
   */
  async getItemDescription(index: number): Promise<string | null> {
    return await this.cartItems
      .nth(index)
      .locator(this.cartItemDescription)
      .textContent();
  }

  /**
   * Gets the price of the inventory item
   * @param index Item index
   * @returns Item price
   */
  async getItemPrice(index: number): Promise<string | null> {
    return await this.cartItems
      .nth(index)
      .locator(this.cartItemPrice)
      .textContent();
  }

  /**
   * Click on Checkout button
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
