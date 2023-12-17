
/**
 * Braulio Batista
 * 
 * December, 2023
 * 
 */
import { Locator, Page } from '@playwright/test';

export class ProductsPage {

    readonly page: Page;
    readonly title: Locator;
    readonly item1: Locator;
    readonly item2: Locator;
    readonly ShoppingCar: Locator;
    readonly carQuantity: Locator;
    readonly removeItem: Locator;
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zip: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly sucessOrder: Locator;
    readonly shopping_cart_badge: Locator;
    readonly resumeOrderValue: Locator;
    readonly summaryPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#header_container');
        this.item1 = page.locator('#add-to-cart-sauce-labs-backpack');
        this.item2 = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.ShoppingCar = page.locator('#ShoppingCar');
        this.carQuantity = page.locator('.cart_quantity').first();
        this.removeItem = page.locator('#remove-sauce-labs-bike-light');
        this.checkoutButton = page.locator('#checkout');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zip = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.sucessOrder = page.locator('.complete-header');
        this.shopping_cart_badge = page.locator('.shopping_cart_badge');
        this.resumeOrderValue = page.locator('#item_4_title_link');
        this.summaryPrice = page.locator('.summary_info_label').last();
    }

    /**
     * wait for selector
     * @returns 
     */
    async waitForSelector() {
        return await this.page.waitForSelector('#header_container .title');
    }
}