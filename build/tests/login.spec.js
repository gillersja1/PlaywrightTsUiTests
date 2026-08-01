"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const InventoryPage_1 = require("../pages/InventoryPage");
test_1.test.describe('Login', () => {
    let loginPage;
    let inventoryPage;
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage_1.LoginPage(page);
        inventoryPage = new InventoryPage_1.InventoryPage(page);
        await loginPage.goto();
    });
    (0, test_1.test)('standard user can log in and see the inventory page', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await (0, test_1.expect)(page).toHaveURL(/.*inventory\.html/);
        await (0, test_1.expect)(inventoryPage.pageTitle).toHaveText('Products');
    });
    (0, test_1.test)('locked out user sees an error message', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await (0, test_1.expect)(loginPage.errorMessage).toContainText('locked out');
    });
    (0, test_1.test)('empty credentials show a required-field error', async () => {
        await loginPage.loginButton.click();
        await (0, test_1.expect)(loginPage.errorMessage).toContainText('Username is required');
    });
    (0, test_1.test)('invalid credentials are rejected', async () => {
        await loginPage.login('invalid_user', 'wrong_password');
        await (0, test_1.expect)(loginPage.errorMessage).toContainText('do not match');
    });
});
