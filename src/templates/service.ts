import { ERRORS } from './../../libs/shared/src/constants/errors.constants';
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import * as puppeteer from 'puppeteer';


@Injectable()

export class TemplateService implements OnModuleInit {

    private readonly logger = new Logger();

    async onModuleInit() {
    }

    async convertHtmlToPdf(htmlContent: string) {

        const openTime = Date.now();
        const executablePath = this.getPuppeteerPath();
        this.logger.log(`Puppe teer executable path: ${executablePath}`);
        const browser = await puppeteer.launch({
            executablePath,
            args: ['--no-sandbox', '--headless', '--disable-dev-shm-usage', '--disable-gpu', "--proxy-server='direct://'", '--proxy-bypass-list=*'],
        });
        this.logger.log(`Launch brower take ${Date.now() - openTime} ms`);

        browser.on('disconnected', () => {
            // browser = undefined;
            this.logger.error(`Brower crash`);
        });

        if (!browser) {
            throw ERRORS.CAN_NOT_VIEW_PDF_NOW;
        }
        const openPageTime = Date.now();
        const pages = await browser.pages();
        const page = pages[0];
        this.logger.log(`Open pages take ${Date.now() - openPageTime} ms`);
        try {
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        } catch (e) { }

        await page.setContent(htmlContent);

        const pdf = await page.pdf({
            format: 'A4',
            margin: { top: '50px', bottom: '50px', left: '50px', right: '50px' },
            printBackground: true,
        });
        return pdf;
    }

    /**
  * On staging, prod will be '/usr/bin/google-chrome'
  * When run On local, depend on developer's os. Please set CHROME_EXECUTE_PATH depend your manchine
  * Some examples:
  * Window:  'C:/Program Files/Google/Chrome/Application/chrome.exe'
  * Macos. Currently is undefined, use default chronium of puppeteer
  * Linux: /usr/bin/google-chrome
  */
    private getPuppeteerPath() {
        const executablePathEnv = process.env.CHROME_EXECUTE_PATH;
        if (process.env.NODE_ENV === 'dev') {
            return executablePathEnv;
        }
        return executablePathEnv || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    }
}