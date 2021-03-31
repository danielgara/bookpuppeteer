const puppeteer = require('puppeteer');
const config = require('./config');

describe('Main', () => {

    it('Executing javascript', async() => {
        const browser = await puppeteer.launch({headless: false,
        defaultViewport: null});
        const page = await browser.newPage();
        const name = 'world';
        //await page.evaluate(() => alert('Hello ' + name));
        await page.evaluate((n) => alert('Hello ' + n), name);
        browser.close();
    });

    it('Screenshots', async() => {
        const browser = await puppeteer.launch({headless: false,
        defaultViewport: null});
        const page = await browser.newPage();
        await page.goto('https://www.packtpub.com/');
        await page.screenshot({ path: 'normal-only-viewport.png'});
        await page.screenshot({ path: 'full-page.png', fullPage: true});
        browser.close();
    });
});