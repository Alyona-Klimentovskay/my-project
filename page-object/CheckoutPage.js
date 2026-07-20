import { AbstractPage } from '../page-object/AbstractPage';


export class CheckoutPage extends AbstractPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.cartNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.payNowButton = page.getByText('Pay Now');
        this.payNowBtn = page.getByRole('button', {name: 'Pay Now'});
        this.cartDateField = page.getByPlaceholder('MM/YY');
        this.cartCVVField = page.getByPlaceholder('CVV (3 digits)');
        
        this.successOrder = page.locator('[id="checkout-success"]');
        this.myAccountBtn = page.locator('[href="/account"]');
        

    }

    async fillPaymentData (cartNumber, cartDate, cartCVV) {
        await this.cartNumberField.pressSequentially(cartNumber, {delay: 200});
        await this.cartNumberField.press('Enter');
        await this.cartDateField.fill(cartDate);
        await this.cartCVVField.fill(cartCVV);
        await this.payNowBtn.click();
        
    }

   
    async goToMyAccount() {
        await this.myAccountBtn.click();
     
    }


}
