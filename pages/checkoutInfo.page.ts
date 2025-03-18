import { Page, Locator } from "@playwright/test";

export class CheckoutInfoPage {
  private page: Page;
  private checkoutInformationHeader: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInformationHeader = page.getByText(
      /Checkout: Your Information/
    );
    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postalCodeInput = page.getByTestId("postalCode");
    this.continueButton = page.getByRole("button", { name: "CONTINUE" });
  }

  /**
   * Wait for Checkout Info page to Load
   */
  async waitForPageLoad() {
    await this.checkoutInformationHeader.waitFor({ state: "visible" });
  }

  /**
   * Fill the Checkout Information
   * @param firstName First Name
   * @param lastName Last Name
   * @param postalCode Postal Code
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click on Continue button
   */
  async proceedToCheckoutOverView() {
    await this.continueButton.click();
  }
}
