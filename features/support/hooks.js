const { Before, After, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const BrowserManager = require('../../utils/BrowserManager');
const { env } = require('../../utils/env');
const path = require('path');
const fs = require('fs');

setDefaultTimeout(60 * 1000);

Before(async function () {
    const browserSetup = await BrowserManager.launchBrowser();
    this.browser = browserSetup.browser;
    this.context = browserSetup.context;
    this.page = browserSetup.page;

    await this.page.goto(env.baseURL, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
});

After(async function (scenario) {
    try {
        if (scenario.result.status === Status.FAILED && this.page) {
            if (!fs.existsSync('screenshots')) {
                fs.mkdirSync('screenshots', { recursive: true });
            }

            const fileName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
            const screenshotPath = path.join('screenshots', `${fileName}.png`);

            await this.page.screenshot({
                path: screenshotPath,
                fullPage: true
            });
        }

        if (this.context) {
            await this.context.close();
        }

        if (this.browser) {
            await this.browser.close();
        }
    } catch (err) {
        console.error('Error in After hook:', err.message);
    }
});