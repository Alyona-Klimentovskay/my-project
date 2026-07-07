import { test } from '@playwright/test';
import { RegisterPage } from '../page-object/RegisterPage';
import { testData } from '../data/testUserData';
import { cartData } from '../data/testUserData';
import { LoginPage } from '../page-object/LoginPage';
import { CatalogPage} from '../page-object/CatalogPage';
import { BasketPage} from '../page-object/BasketPage';
import { CheckoutPage } from '../page-object/CheckoutPage';
import { MyAccountPage } from '../page-object/MyAccountPage';

test.setTimeout(50 * 1000);
// test.use({viewport: {width: 1928, height: 1080}});
test('E2E Test', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);

    
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(testData);
    await loginPage.login(testData.emailField, testData.passwordField);
    await catalogPage.selectProduct();
    
    const basketPage = new BasketPage(page, catalogPage.tabletNameValue, catalogPage.coffeeMachineNameValue, catalogPage.coffeeMachinePriceValue, catalogPage.tabletPriceValue);
    await basketPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cartData.cartNumber, cartData.cartDate, cartData.cartCVV);
    await checkoutPage.successOrderMessage();
    await checkoutPage.goToMyAccount();

    await myAccountPage.checkFinalOrder(catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue);
    await myAccountPage.checkTwoItems();
    await myAccountPage.logout();
    

});





 



