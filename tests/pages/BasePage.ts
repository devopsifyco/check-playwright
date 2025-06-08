import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected baseUrl: string = 'https://check.opsify.dev';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param path - The path to navigate to
     */
    async navigate(path: string = '') {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    /**
     * Wait for the page to be loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get the current page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Take a screenshot
     * @param name - Name of the screenshot
     */
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `./reports/screenshots/${name}.png` });
    }

    /**
     * Wait for an element to be visible
     * @param selector - Element selector
     */
    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    /**
     * Click on an element
     * @param selector - Element selector
     */
    async click(selector: string) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    /**
     * Fill in an input field
     * @param selector - Element selector
     * @param value - Value to fill in
     */
    async fill(selector: string, value: string) {
        await this.waitForElement(selector);
        await this.page.fill(selector, value);
    }

    /**
     * Get text content of an element
     * @param selector - Element selector
     */
    async getText(selector: string): Promise<string> {
        await this.waitForElement(selector);
        return await this.page.textContent(selector) || '';
    }
} 