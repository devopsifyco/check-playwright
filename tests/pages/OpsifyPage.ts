import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpsifyPage extends BasePage {
    // Selectors
    private readonly searchInput = 'input[type="text"]';
    private readonly searchButton = '.search-btn';
    private readonly resultsContainer = 'table.results-table';
    private readonly errorMessage = '.error-message';
    private readonly loadingSpinner = '.loading-spinner';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Perform a search on the Opsify website
     * @param query - The search query
     */
    async search(query: string) {
        await this.fill(this.searchInput, query);
        await this.click(this.searchButton);
        await this.waitForPageLoad();
    }

    /**
     * Perform a search using Enter key
     * @param query - The search query
     */
    async searchWithEnter(query: string) {
        await this.fill(this.searchInput, query);
        await this.page.keyboard.press('Enter');
        await this.waitForPageLoad();
    }

    /**
     * Check if search results are visible
     */
    async areResultsVisible(): Promise<boolean> {
        try {
            await this.waitForElement(this.resultsContainer);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get error message if present
     */
    async getErrorMessage(): Promise<string> {
        try {
            return await this.getText(this.errorMessage);
        } catch {
            return '';
        }
    }

    /**
     * Wait for loading spinner to disappear
     */
    async waitForLoadingToComplete() {
        try {
            await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden' });
        } catch {
            // Spinner might not be present, which is fine
        }
    }

    /**
     * Get table headers from the results table
     */
    async getTableHeaders(): Promise<string[]> {
        await this.waitForElement(this.resultsContainer);
        const headerCells = await this.page.$$(`${this.resultsContainer} thead tr th`);
        return Promise.all(headerCells.map(async cell => (await cell.textContent())?.trim() || ''));
    }

    /**
     * Get all search results as array of objects (keyed by header)
     */
    async getSearchResults(): Promise<Record<string, string>[]> {
        await this.waitForElement(this.resultsContainer);
        const headers = await this.getTableHeaders();
        const rows = await this.page.$$(`${this.resultsContainer} tbody tr`);
        const results: Record<string, string>[] = [];
        for (const row of rows) {
            const cells = await row.$$eval('td', tds => tds.map(td => td.textContent?.trim() || ''));
            const rowObj: Record<string, string> = {};
            headers.forEach((header, idx) => {
                rowObj[header] = cells[idx] || '';
            });
            results.push(rowObj);
        }
        return results;
    }

    /**
     * Check if loading spinner is visible
     */
    async isLoadingSpinnerVisible(): Promise<boolean> {
        return await this.page.isVisible(this.loadingSpinner);
    }
} 