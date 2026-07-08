import { test, expect } from '@playwright/test';
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
test('Create user, login, order 2 items, payment', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);
    const basketPage = new BasketPage(page);

    
    await registerPage.openLoginPage();
    await registerPage.fillRegistrationForm(testData);
    await loginPage.login(testData.emailField, testData.passwordField);
    const items = await catalogPage.selectProduct();

    await expect(catalogPage.cartCount).toBeVisible();
    await expect(catalogPage.cartCount).toContainText('2', {timeout:3000});
    
    await catalogPage.gotoBasket();

    // Check Products details
    await expect(basketPage.firstProductItem).toHaveText(items.firstProduct.name);
    await expect(basketPage.secondProductItem).toHaveText(items.secondProduct.name);
    await expect(basketPage.firstItemPrice).toHaveText(items.firstProduct.price);
    await expect(basketPage.secondItemPrice).toHaveText(items.secondProduct.price);

    const firstProductPriceNumber = Number((await basketPage.firstItemPrice.innerText()).replace(/\D/g, ''));
    const secondProductPriceNumber = Number((await basketPage.secondItemPrice.innerText()).replace(/\D/g, ''));
    const totalNumber = parseInt((await basketPage.totalValue.innerText()).replace(/[^\d.]/g, ''));
    expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);

    await basketPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cartData.cartNumber, cartData.cartDate, cartData.cartCVV);

    await expect(checkoutPage.successOrder).toBeVisible({timeout: 8000});
    await expect(checkoutPage.page).toHaveURL('/checkout');

    await checkoutPage.goToMyAccount();
    await expect(checkoutPage.page).toHaveURL('/account');

    const price1 = Number(items.firstProduct.price.replace('$', ''));
    const price2 = Number(items.secondProduct.price.replace('$', ''));
    const totalPrice = price1 + price2;
    await expect(myAccountPage.totalAmountField).toContainText(`${totalPrice}`);
       
    await expect(myAccountPage.items.first()).toBeVisible();
    await expect(myAccountPage.items.last()).toBeVisible();
    await expect(myAccountPage.logoutButton).toBeEnabled();
    await myAccountPage.items.last().scrollIntoViewIfNeeded();


    await myAccountPage.logout();
    

});





 



