import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object/LoginPage';
import { AbstractPage } from '../page-object/AbstractPage';


test.describe('Snapshots tesing', () => {
    test("Login Page - visualRegression", async({page}) => {
        const loginPage = new LoginPage(page);
        const abstractPage = new AbstractPage(page);
        
        await loginPage.openPage('/login');
        await abstractPage.checkVisualRegression('login-page.png', {
            maxDiffPixels: 100
        });
        
      
    });


    test("Catalop Page - visualRegression", async({page}) => {
        const loginPage = new LoginPage(page);
        const abstractPage = new AbstractPage(page);
        
        await loginPage.openPage('/');
        await abstractPage.checkVisualRegression('catalog-page.png', {
            maxDiffPixelRatio: 0.01
        });
       
    });

})
