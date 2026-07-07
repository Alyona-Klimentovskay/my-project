import { faker } from '@faker-js/faker';

export const testData = {
    firstNameField: faker.person.firstName(),
    lastNameField: faker.person.lastName(),
    emailField: faker.internet.email(),
    passwordField: faker.internet.password(),
    cityField: faker.location.city(),
    phoneField: '+380957641380',
    countryDropDown: 'Ukraine',
    streetField: faker.location.streetAddress(),
    zipCodeField: '50947',
    
}

export const cartData = {
    cartNumber: process.env.CART_NUMBER,
    cartDate: process.env.CART_DATE,
    cartCVV: process.env.CART_CVV,
}

export const apiDataPost = {
    title: 'Hello world',
    body: 'Test body',
    userId: 1,
}


export const apiDataPatch = {
    title: 'Hello AQA'
}
