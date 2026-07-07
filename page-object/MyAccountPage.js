import { expect } from '@playwright/test';

export class MyAccountPage {
    constructor(page) {
        this.page = page;
        this.items = page.locator('#account-order-0 ul > li');
        this.totalAmountField = page.locator('#account-order-0 p', {hasText: 'Total Amount:'});
        this.logoutButton = page.locator('[id="account-logout-button"]');
        
    }

    async checkFinalOrder(firstItemPrice, secondItemPrice) {
        const price1 = Number(firstItemPrice.replace('$', ''));
        const price2 = Number(secondItemPrice.replace('$', ''));
        const totalPrice = price1 + price2;
        console.log(totalPrice);
        await expect(this.totalAmountField).toContainText(`${totalPrice}`);
       
    }


    async checkTwoItems() {
        await expect(this.items.first()).toBeVisible();
        await expect(this.items.last()).toBeVisible();
        await expect(this.logoutButton).toBeEnabled();

        await this.items.last().scrollIntoViewIfNeeded();
                
    }

    async logout() {
        await this.logoutButton.click();
        
    }



}