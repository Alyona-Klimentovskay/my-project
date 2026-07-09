import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page-object/RegisterPage';
import { testData } from '../data/testUserData';
import { cartData } from '../data/testUserData';
import { LoginPage } from '../page-object/LoginPage';
import { CatalogPage} from '../page-object/CatalogPage';
import { BasketPage} from '../page-object/BasketPage';
import { CheckoutPage } from '../page-object/CheckoutPage';
import { MyAccountPage } from '../page-object/MyAccountPage';

let items;

test.setTimeout(50 * 1000);
// test.use({viewport: {width: 1928, height: 1080}});
test.describe('E2E order flow', () => {


    test.beforeAll(async() => {
        console.log('beforeAll: prepare test data');
        console.log('beforeAll: generate users');
        console.log('beforeAll: ready');
    });


    test.beforeEach(async() => {
        console.log('beforeEach: preconditions');
        
    });


    test.afterEach(async({page},testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            console.log('afterEach: test failed: ${testInfo.title}');
            await page.screenshot({
                path: 'test-results/${testInfo.title} -failed.png',
                fullPage: true,
            })
        }
    });

    test.afterAll(async() => {
        console.log('afterAll: clean up test data');
    })




    test('Create user, login, order 2 items, payment', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const catalogPage = new CatalogPage(page);
        const checkoutPage = new CheckoutPage(page);
        const myAccountPage = new MyAccountPage(page);
        const basketPage = new BasketPage(page);

        await test.step('Open Login page', async () => {
            await registerPage.openLoginPage();
        })
    
        await test.step('Register new user', async () => {
            await registerPage.fillRegistrationForm(testData);
        })

        await test.step('Login with created user', async () => {
            await loginPage.login(testData.emailField, testData.passwordField);
        })

        await test.step('Select 2 items', async () => {
            items = await catalogPage.selectProduct();
   
        })

        await test.step('Verify basket counter(visible, qty)', async () => {
            await expect(catalogPage.cartCount).toBeVisible();
            await expect(catalogPage.cartCount).toContainText('2', {timeout:3000});
        })

        await test.step('Go to basket', async () => {
            await catalogPage.gotoBasket();
        })


        await test.step('Verify products detail in basket', async () => {
        // Check Products details
            await expect(basketPage.firstProductItem).toHaveText(items.firstProduct.name);
            await expect(basketPage.secondProductItem).toHaveText(items.secondProduct.name);
            await expect(basketPage.firstItemPrice).toHaveText(items.firstProduct.price);
            await expect(basketPage.secondItemPrice).toHaveText(items.secondProduct.price);

        })

        await test.step('Verify totap price', async () => {
            const firstProductPriceNumber = Number((await basketPage.firstItemPrice.innerText()).replace(/\D/g, ''));
            const secondProductPriceNumber = Number((await basketPage.secondItemPrice.innerText()).replace(/\D/g, ''));
            const totalNumber = parseInt((await basketPage.totalValue.innerText()).replace(/[^\d.]/g, ''));
            expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
        })


        await test.step('Go to checkout page', async () => {
            await basketPage.gotoCheckoutPage();
        })
   

        await test.step('Fill payment data and submit  payment', async () => {
            await checkoutPage.fillPaymentData(cartData.cartNumber, cartData.cartDate, cartData.cartCVV);
        })

        await test.step('Verify successful order', async () => {
            await expect(checkoutPage.successOrder).toBeVisible({timeout: 8000});
            await expect(checkoutPage.page).toHaveURL('/checkout');
        })

        await test.step('Go to My Account page', async () => {
            await checkoutPage.goToMyAccount();
            await expect(checkoutPage.page).toHaveURL('/account');
        })

        await test.step('Verify total amount in My Account page', async () => {
            const price1 = Number(items.firstProduct.price.replace('$', ''));
            const price2 = Number(items.secondProduct.price.replace('$', ''));
            const totalPrice = price1 + price2;
            await expect(myAccountPage.totalAmountField).toContainText(`${totalPrice}`);
        })

        await test.step('Verify items list', async () => {
            await expect(myAccountPage.items.first()).toBeVisible();
            await expect(myAccountPage.items.last()).toBeVisible();
            await expect(myAccountPage.logoutButton).toBeEnabled();
            await myAccountPage.items.last().scrollIntoViewIfNeeded();

        })

        await test.step('Logout', async () => {
            await myAccountPage.logout();
        })   

    });

})





 



