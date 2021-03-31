const puppeteer = require('puppeteer');

describe('PDF demo', () => {

    it('Should visually match', async () => {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        });
        const page = await browser.newPage();
        await page.goto('http://variamos.tk/');
        await page.addStyleTag({
            content : `
            .input-group {
            display: none !important;
            }`
        });
        await page.pdf({
            path: './headers.pdf',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: `
            <span style="font-size: 12px;">
            This is a custom PDF for
            <span class="title"></span> (<span class="url"></
           span>)
            </span>`,
            footerTemplate: `
            <span style="font-size: 12px;">
            Generated on: <span class="date"></span><br/>
            Pages <span class="pageNumber"></span> of <span
           class="totalPages"></span>
            </span>`,
            margin: {
                top: '100px',
                bottom: '100px'
            }
        });
        await browser.close();
    });

});