import { test, expect } from "@playwright/test";
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  SuccessPage,
  InventoryItems,
} from "../pages";
import * as fs from "fs";
import { decrypt } from "../utils/encrypt_credentials";

//Get credentials
const config = JSON.parse(fs.readFileSync("./config/config.json", "utf8"));
const { username, password } = config;

test.describe("Checkout Process", () => {
  test("should successfully complete checkout process", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const successPage = new SuccessPage(page);

    await test.step("Navigate to Login Page", async () => {
      await loginPage.navigate();
    });

    await test.step("Login to the application", async () => {
      console.log("###########Username:" + username);
      console.log("###########Password:" + password);
      await loginPage.login(decrypt(username), decrypt(password));
    });
    const itemsToAdd = [0, 1, 2, 3]; //Add first 4 items
    const addItems: InventoryItems[] = [];

    await test.step("Add items to cart", async () => {
      await inventoryPage.waitForPageToLoad();

      for (const itemIndex of itemsToAdd) {
        const itemTitle = await inventoryPage.getItemTitle(itemIndex);
        const itemDesc = await inventoryPage.getItemDescription(itemIndex);
        const itemPrice = await inventoryPage.getItemPrice(itemIndex);
        addItems.push({
          title: itemTitle,
          description: itemDesc,
          price: itemPrice ? itemPrice.replace("$", "") : null,
        });
        await inventoryPage.addItemToCart(itemIndex);
      }
    });

    await test.step("Validate item count in the cart badge", async () => {
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(itemsToAdd.length);
    });

    await test.step("Navigate to cart", async () => {
      await inventoryPage.navigateTocart();
    });

    await test.step("Verify correct items were added to the cart", async () => {
      await cartPage.waitForPageLoad();
      const cartItemCount = await cartPage.getCartItemCount();
      expect(cartItemCount).toBe(itemsToAdd.length);

      for (let i = 0; i < cartItemCount; i++) {
        const cartItemTitle = await cartPage.getItemTitle(i);
        const cartItemDesc = await cartPage.getItemDescription(i);
        const cartItemPrice = await cartPage.getItemPrice(i);
        const cleanedPrice = cartItemPrice
          ? cartItemPrice.replace("$", "")
          : null;

        expect(
          addItems.some((item) => item.title === cartItemTitle)
        ).toBeTruthy();
        expect(
          addItems.some((item) => item.description === cartItemDesc)
        ).toBeTruthy();
        expect(
          addItems.some((item) => item.price === cleanedPrice)
        ).toBeTruthy();
      }
    });

    await test.step("Proceed to the Checkout information page, fill checkout information and process to Checkout Overview page", async () => {
      await cartPage.proceedToCheckout();
      await checkoutInfoPage.waitForPageLoad();
      await checkoutInfoPage.fillCheckoutInformation("John", "Doe", "54321");
      await checkoutInfoPage.proceedToCheckoutOverView();
    });

    await test.step("Verify cart items in the checkout overview page", async () => {
      await checkoutOverviewPage.waitForPageLoad();
      const overviewCartItemCount =
        await checkoutOverviewPage.getOverviewCartItemCount();
      expect(overviewCartItemCount).toBe(itemsToAdd.length);

      for (let i = 0; i < overviewCartItemCount; i++) {
        const overviewCartItemTitle = await checkoutOverviewPage.getItemTitle(
          i
        );
        const overviewCartItemDesc =
          await checkoutOverviewPage.getItemDescription(i);
        const overviewCartItemPrice = await checkoutOverviewPage.getItemPrice(
          i
        );
        const cleanedPrice = overviewCartItemPrice
          ? overviewCartItemPrice.replace("$", "")
          : null;

        expect(
          addItems.some((item) => item.title === overviewCartItemTitle)
        ).toBeTruthy();
        expect(
          addItems.some((item) => item.description === overviewCartItemDesc)
        ).toBeTruthy();
        expect(
          addItems.some((item) => item.price === cleanedPrice)
        ).toBeTruthy();
      }
    });

    await test.step("Finish checkout and verify success message", async () => {
      await checkoutOverviewPage.finishCheckout();
      await successPage.waitForPageLoad();
      const successMessage = await successPage.getSucccessMessage();
      expect(successMessage).toBe("THANK YOU FOR YOUR ORDER");
    });
  });
});
