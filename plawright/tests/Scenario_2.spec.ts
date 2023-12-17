/**
 * Braulio Batista
 * 
 * December 2023
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login';
import { ProductsPage } from './pages/products';


test.describe.parallel.only('QA Automation Assessment', () => {
  let loginPage: LoginPage;
  let productPage: ProductsPage;
  // data
  const dataUser = require('../data-source/users.json');
  const dataProduct = require('../data-source/product.json');

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
  });

  test('the authentication page with a negative scenario', async ({ page }) => {
    // Navigate to page
    await page.goto(dataUser.webSiteUrl)
    await loginPage.username.fill(dataUser.user1);
    await loginPage.password.fill(dataUser.password);
    await loginPage.loginButton.click();
    expect(await loginPage.error.innerText()).toBe(dataUser.error);
  });

  test('happy flow', async ({ page }) => {
    await test.step('the authentication page with a positive scenario', async () => {
      // Navigate to page
      await page.goto(dataUser.webSiteUrl)
      await loginPage.username.fill(dataUser.user2);
      await loginPage.password.fill(dataUser.password);
      await loginPage.loginButton.click();
      await productPage.waitForSelector();
      expect(await productPage.title.innerText()).toContain(dataProduct.ItemsTitle);
    });
    await test.step('Add two itens to the cart.', async () => {
      await productPage.item1.click();
      await productPage.item2.click();
      expect(await productPage.shopping_cart_badge.innerText()).toBe(dataProduct.numberOfItems)
    });
    await test.step('Change the quantity of one item in the Your Cart page', async () => {
      await productPage.shopping_cart_badge.click();
      // Note the field quantity is not editable, but with the Type into the field character by character, as if it was a user with a real keyboard, but the final price will not be updated
      await productPage.carQuantity.type(dataProduct.numberOfItems);
      expect(await productPage.shopping_cart_badge.innerText()).toBe(dataProduct.numberOfItems)
    });
    await test.step('Delete one of the item', async () => {
      await productPage.removeItem.click();
      expect(await productPage.shopping_cart_badge.innerText()).toBe(dataProduct.quantity1)
    });
    await test.step('Click the Checkout button and Fill in and validate the First Name , Last Name and Zip/Postal Code fields', async () => {
      await productPage.checkoutButton.click();
      await productPage.firstName.fill(dataProduct.firstName);
      await productPage.lastName.fill(dataProduct.lastName);
      await productPage.zip.fill(dataProduct.zip);
      expect(await productPage.firstName.inputValue()).toBe(dataProduct.firstName);
      expect(await productPage.lastName.inputValue()).toBe(dataProduct.lastName);
      expect(await productPage.zip.inputValue()).toBe(dataProduct.zip);
    });
    await test.step('Complete the order and make sure the order has been succeed', async () => {
      await productPage.continueButton.click();
      expect(await  productPage.resumeOrderValue.innerText()).toBe(dataProduct.itemTitle);
      expect(await productPage.summaryPrice.innerText()).toContain(dataProduct.summaryPrice);
    });
    await test.step('Make validations along the above steps to make sure the flow is successful.', async () => {
      await productPage.finishButton.click();
      expect(await  productPage.sucessOrder.innerText()).toBe(dataProduct.successOrderMessage);
    });
  });

});