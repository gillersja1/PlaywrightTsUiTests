class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addItemToCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeItemFromCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async openCart() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async goToCheckout() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }

  async completeCheckout(firstName, lastName, postalCode) {
    await this.page.locator("#first-name").fill(firstName);
    await this.page.locator("#last-name").fill(lastName);
    await this.page.locator("#postal-code").fill(postalCode);
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  async getCartCount() {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }
    return Number(await this.cartBadge.innerText());
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getItemPrices() {
    const priceTexts = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }
}

module.exports = { InventoryPage };
