"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryPage = void 0;
/**
 * Page object for the saucedemo.com inventory (product listing) page.
 */
class InventoryPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }
    async addItemToCart(itemName) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.getByRole('button', { name: 'Add to cart' }).click();
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
        const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
        return priceTexts.map((price) => parseFloat(price.replace('$', '')));
    }
}
exports.InventoryPage = InventoryPage;
