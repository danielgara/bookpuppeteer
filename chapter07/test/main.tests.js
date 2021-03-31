const puppeteer = require('puppeteer');
const config = require('./config');
const expect = require('chai').expect;
const Differencify = require('differencify');
const differencify = new Differencify({ debug: true, mismatchThreshold: 0});

describe('Main', () => {
    let browser;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);
    });

    after(async () => {
        await browser.close();
    })

    it ('Should visually match', async() => {
        const target = differencify.init({chain: false, testName: 'Home' });
        await target.launch();
        const page = await target.newPage();
        await page.setViewport({ width: 1600, height: 1200 });
        await page.goto(config.baseURL);
        const image = await page.screenshot();
        const result = await target.toMatchSnapshot(image);
        await page.close();
        await target.close();
        expect(result).to.be.true;
    });

    /*it('Screenshots', async() => {
        const browser = await puppeteer.launch({headless: false,
        defaultViewport: null});
        const page = await browser.newPage();
        await page.goto('https://www.packtpub.com/');
        await page.screenshot({ path: 'normal-only-viewport.png'});
        await page.screenshot({ path: 'full-page.png', fullPage: true});
        browser.close();
    });*/
});