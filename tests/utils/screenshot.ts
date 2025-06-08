import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class ScreenshotUtil {
    private static readonly screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');

    /**
     * Initialize screenshot directory
     */
    static initialize() {
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
    }

    /**
     * Take a screenshot with timestamp
     * @param page - Playwright page object
     * @param name - Name of the screenshot
     */
    static async takeScreenshot(page: Page, name: string) {
        this.initialize();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${name}_${timestamp}.png`;
        const filePath = path.join(this.screenshotDir, fileName);
        
        await page.screenshot({
            path: filePath,
            fullPage: true
        });
        
        return filePath;
    }

    /**
     * Take a screenshot of a specific element
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param name - Name of the screenshot
     */
    static async takeElementScreenshot(page: Page, selector: string, name: string) {
        this.initialize();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${name}_${timestamp}.png`;
        const filePath = path.join(this.screenshotDir, fileName);
        
        const element = await page.$(selector);
        if (element) {
            await element.screenshot({
                path: filePath
            });
        }
        
        return filePath;
    }
} 