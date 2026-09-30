import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', () => {
  test.describe.configure({ timeout: 60000 });

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('standard user can log in and see the inventory page', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('locked out user sees an error message', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('empty credentials show a required-field error', async () => {
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('invalid credentials are rejected', async () => {
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  test('user can log out and return to the login page', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.logout();

    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});
