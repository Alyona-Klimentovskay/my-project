import { urlToHttpOptions } from 'node:url';
import { AbstractPage } from '../page-object/AbstractPage';



export class BasketPage  extends AbstractPage{
    constructor(page, tabletNameValue, coffeeMachineNameValue, tabletPriceValue, coffeeMachinePriceValue) {
        super(page);
        this.page = page;
        this.firstProductItem = page.locator('[id="cart-item-name-6"]');
        this.secondProductItem = page.locator('[id="cart-item-name-5"]');

        this.firstItemPrice = page.locator('[id="cart-item-price-6"]');
        this.secondItemPrice = page.locator('[id="cart-item-price-5"]');

        this.totalValue = page.locator('[id="cart-total"]');
        this.checkoutButton = page.locator('[id="cart-checkout-button"]');

        this.removefirstItemButton = page.locator('[id="cart-item-decrease-6"]');
        this.addfirstItemButton = page.locator('[id="cart-item-increase-6"]');
       
    }

    async gotoCheckoutPage () {
        await this.checkoutButton.waitFor({ status: 'visible'});
        await this.checkoutButton.click({ force: true });
        await this.page.waitForURL('/checkout');
        
    }

  
}
