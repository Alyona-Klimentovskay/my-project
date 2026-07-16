import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page-object/RegisterPage';
import { LoginPage } from '../page-object/LoginPage';
import { testData } from '../data/testUserData';
import path from 'node:path';


test('setup: login and save storageState', async({page, context}) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);


    await test.step('Open Login page', async () => {
        await registerPage.openLoginPage();
    })
        
    await test.step('Register new user', async () => {
        await registerPage.fillRegistrationForm(testData);
    })
    
    await test.step('Login with created user', async () => {
        await loginPage.login(testData.emailField, testData.passwordField);
    })

    await test.step('Save storage state', async() => {
        await context.storageState({path: 'data/storageState.json'});

    })
})