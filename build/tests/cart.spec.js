"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const InventoryPage_1 = require("../pages/InventoryPage");
test_1.test.describe('Shopping cart', () => {
    let loginPage;
    let inventoryPage;
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage_1.LoginPage(page);
        inventoryPage = new InventoryPage_1.InventoryPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });
    (0, test_1.test)('adding an item updates the cart badge', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        (0, test_1.expect)(await inventoryPage.getCartCount()).toBe(1);
    });
    (0, test_1.test)('adding multiple items accumulates the cart count', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        (0, test_1.expect)(await inventoryPage.getCartCount()).toBe(2);
    });
    (0, test_1.test)('sorting by price low to high orders items correctly', async () => {
        await inventoryPage.sortBy('lohi');
        const prices = await inventoryPage.getItemPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        (0, test_1.expect)(prices).toEqual(sortedPrices);
    });
});
