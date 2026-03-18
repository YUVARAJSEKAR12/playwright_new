const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const LoginPage = require('../../pages/LoginPage');

Given('I open the login page', async function () {
    this.pages.loginPage = new LoginPage(this.page);
});

When('I login with username {string} and password {string}', async function (username, password) {
    await this.pages.loginPage.login(username, password);
    console.log("testpasses");
});

Then('I should see the inventory page', async function () {
    const isVisible = await this.page.locator('.inventory_list').isVisible();
    assert.strictEqual(isVisible, true, 'Inventory page is not visible');
});
