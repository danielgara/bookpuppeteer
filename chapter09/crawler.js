const https = require('https');
const xmlParser = require('xml2js').parseString;
const puppeteer = require('puppeteer');
const fs = require('fs');

(async function () {
    const sitemapxml = await getSitemap();
    const categories = await getCategories(sitemapxml);
    const books = [];
    const page = await getPuppeteerPage();
    let i = 0;
    for (const categoryURL of categories) {
        if (i == 0) {
            const newBooks = await getBooks(categoryURL, page);
            if (newBooks) {
                books.push(...newBooks);
            }
            i = 1;
        }
    }
    const prices = [];
    let j = 0;
    for (const bookURL of books) {
        if (j < 2) {
            const price = await getPrice(bookURL, page);
            if (price) {
                prices.push(price);
            }
            j = j + 1;
        }
    }
    console.log(prices);
    //fs.writeFile('./prices.json', prices);
    page.browser().close();
})();

async function getPrice(bookURL, page) {
    try {
        await page.goto(bookURL);
        await page.waitForSelector('.price-list__item .price-list__price');
        const data = await page.evaluate(()=> {
            if(document.querySelectorAll('.price-list__name')[2].innerText.trim() == 'eBook') {
                const price = document.querySelectorAll('.price-list__price')[2];
                return {
                    book: document.querySelector('.product-info__title').innerText,
                    priceeBook: price.innerText,
                }
            }
        });
        return data;
    }
    catch {
        console.log(`Unable to get price from ${bookURL}`);
    }
}

async function getBooks(categoryURL, page) {
    try {
        await page.goto(categoryURL);
        await page.waitForSelector('a.card-body');
        return await page.evaluate(() => {
            const links = document.querySelectorAll('a.card-body');
            return Array.from(links).map(l => l.getAttribute('href')).slice(0, 10);
        });
    }
    catch {
        console.log(`Unable to get books from ${categoryURL}`);
    }
}
async function getPuppeteerPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const userAgent = await browser.userAgent();
    const page = await browser.newPage();
    await page.setUserAgent(userAgent + ' UITestingWithPuppeteerDemoBot');
    return page;
}

function getCategories(sitemapxml) {
    let resolve;
    const promise = new Promise(r => resolve = r);
    xmlParser(sitemapxml, function(err, result) {
        let output = result.urlset.url
            .filter(url => url.loc[0].match(/\//g).length === 3)
            .slice(0, 10)
            .map(url => url.loc[0]);
        resolve(output);
    });

    return promise;
}

function getSitemap() {
    let resolve;
    const promise = new Promise(r => resolve = r);
    https.get('https://www.packtpub.com/sitemap.xml', function (res) {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
    });

    return promise;
}