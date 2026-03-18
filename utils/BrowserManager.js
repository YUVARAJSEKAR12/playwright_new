const { chromium, firefox, webkit } = require('playwright');
const { env } = require('./env');

class BrowserManager {
    static async launchBrowser() {
        let browserType;

        switch (env.browserName.toLowerCase()) {
            case 'firefox':
                browserType = firefox;
                break;
            case 'webkit':
                browserType = webkit;
                break;
            case 'chromium':
            default:
                browserType = chromium;
                break;
        }

        const browser = await browserType.launch({
            headless: env.headless
        });

        const context = await browser.newContext({
            recordVideo: {
                dir: 'videos/'
            }
        });

        const page = await context.newPage();

        return { browser, context, page };
    }
}

module.exports = BrowserManager;