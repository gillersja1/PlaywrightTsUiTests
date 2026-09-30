import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Shopping cart', () => {
  test.describe.configure({ timeout: 60000 });

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('adding an item updates the cart badge', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');

    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('adding multiple items accumulates the cart count', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('removing an item reduces the cart count', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');

    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test('checkout completes successfully with valid customer info', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await inventoryPage.goToCheckout();
    await inventoryPage.completeCheckout('Jane', 'Doe', '12345');

    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  test('sorting by price low to high orders items correctly', async () => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
