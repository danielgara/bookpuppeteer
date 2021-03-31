const puppeteer = require('puppeteer');
const config = require('./config');
const expect = require('chai').expect;
const Differencify = require('differencify');
const differencify = new Differencify({ debug: true, mismatchThreshold: 0 });

describe('Main', () => {
    let browser;

    before(async () => {
        browser = await puppeteer.launch(config.launchOptions);
    });

    after(async () => {
        await browser.close();
    })

    /*it('Should visually match', async () => {
        for (const device of ['iPhone 6', 'iPad', 'iPad landscape',
            '']) {
            const target = differencify.init({
                chain: false, testName:
                    'Home ' + device
            });
            await target.launch();
            const page = await target.newPage();
            if (device) {
                await page.emulate(puppeteer.devices[device]);
            } else {
                await page.setViewport({ width: 1600, height: 1200 });
            }
            await page.goto(config.baseURL);
            const image = await page.screenshot();
            const result = await target.toMatchSnapshot(image)
            await page.close();
            await target.close();
            expect(result).to.be.true;
        }
    });*/

    it('Emulate network', async () => {
        const puppeteer = require('puppeteer');
        const slow3G = puppeteer.networkConditions['Slow 3G'];
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.emulateNetworkConditions(slow3G);
            // other actions...
            await browser.close();
        })();
    })
});