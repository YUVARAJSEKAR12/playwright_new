class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url, {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
    }

    async fill(locator, value) {
        await this.page.fill(locator, value);
    }

    async click(locator) {
        await this.page.click(locator);
    }

    async getText(locator) {
        return await this.page.textContent(locator);
    }
}

module.exports = BasePage;