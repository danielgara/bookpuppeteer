const puppeteer = require('puppeteer');
const LoginPageModel = require('./pom/LoginPageModel.js');
const config = require('./config');

describe('Login Page', () => {
    let browser;
    let page;
    let pageModel;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);
    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        pageModel = new LoginPageModel(page, config);
        await pageModel.go();
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should load image after login', async() => {
      const promise = page.waitForResponse(config.productImage);
      await pageModel.login(config.username, config.password);
      await promise;
    });
});