import { Page, Locator } from "@playwright/test";

export interface InventoryItems {
  title: string | null;
  description: string | null;
  price: string | null;
}

export class InventoryPage {
  private page: Page;
  private inventoryContainer: Locator;
  private inventoryItems: Locator;
  private cartIcon: Locator;
  private cartIconBadge: Locator;
  private inventoryItemName: string;
  private inventoryItemDescription: string;
  private inventoryItemPrice: string;
  private addToCart: string;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator(".inventory_container");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartIcon = page.locator("#shopping_cart_container");
    this.cartIconBadge = page.locator(".shopping_cart_badge");
    this.inventoryItemName = ".inventory_item_name";
    this.inventoryItemDescription = ".inventory_item_desc";
    this.inventoryItemPrice = ".pricebar .inventory_item_price";
    this.addToCart = ".btn_primary.btn_inventory";
  }

  /**
   * Wait for Inventory page to load
   */
  async waitForPageToLoad() {
    await this.inventoryContainer.waitFor({ state: "visible" });
  }

  /**
   * Get the title of the inventory item
   * @param index Item index
   * @returns Item title
   */
  async getItemTitle(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .locator(this.inventoryItemName)
      .textContent();
  }

  /**
   * Get the description of the inventory item
   * @param index Item index
   * @returns Item description
   */
  async getItemDescription(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .locator(this.inventoryItemDescription)
      .textContent();
  }

  /**
   * Get the price of the inventory item
   * @param index Item index
   * @returns Item price
   */
  async getItemPrice(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .locator(this.inventoryItemPrice)
      .textContent();
  }

  /**
   * Add inventory item to cart
   * @param index Item index
   */
  async addItemToCart(index: number) {
    await this.inventoryItems.nth(index).locator(this.addToCart).click();
  }

  /**
   * Get count of cart items from the cart item badge
   * @returns Cart item count
   */
  async getCartItemCount(): Promise<number> {
    return (await this.cartIconBadge.isVisible())
      ? parseInt((await this.cartIconBadge.textContent()) || "0")
      : 0;
  }

  /**
   * Click on cart icon
   */
  async navigateTocart() {
    await this.cartIcon.click();
  }
}
