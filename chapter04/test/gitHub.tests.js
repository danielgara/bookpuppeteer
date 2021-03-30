  
const puppeteer = require('puppeteer');
const config = require('./config');

describe('Github Test', () => {
    let browser;
    let page;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);
    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        await page.goto('https://github.com/');
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should use shortcuts', async() => {
      await page.keyboard.press('Slash');
      await page.keyboard.type('puppeteer', {delay: 1000});
      await page.keyboard.press('Enter');
    });

});