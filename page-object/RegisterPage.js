
export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.registerBtn = page.locator('[id="login-register-button"]');
        this.firstNameField = page.locator('[id="register-first-name"]');
        this.lastNameField = page.locator('[id="register-last-name"]');
        this.emailField = page.locator('[id="register-email"]');
        this.passwordField = page.locator('[id="register-password"]');
        this.cityField = page.locator('[id="register-city"]');
        this.phoneField = page.locator('[id="register-phone"]');
        this.countryDropDown = page.locator('[id="register-country"]');
        this.streetField = page.locator('[id="register-street"]');
        this.zipCodeField = page.locator('[id="register-zip"]');
        this.registerButton = page.locator('[id="register-button"]');
 
    }

    async openLoginPage() {
        await this.page.goto('/login')
    }

    async fillRegistrationForm(testData) {
        await this.registerBtn.click();
        await this.firstNameField.waitFor();
        await this.firstNameField.fill(testData.firstNameField);
        await this.lastNameField.fill(testData.lastNameField); 
        await this.emailField.fill(testData.emailField);
        await this.passwordField.fill(testData.passwordField);
        await this.cityField.fill(testData.cityField);
        await this.phoneField.fill(testData.phoneField);
        await this.countryDropDown.selectOption(testData.countryDropDown);
        await this.streetField.fill(testData.streetField);
        await this.zipCodeField.fill(testData.zipCodeField);
        await this.registerButton.click();
    }



}


