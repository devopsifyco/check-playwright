import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpsifyPage extends BasePage {
    // Selectors
    private readonly searchInput = 'input[type="text"]';
    private readonly searchButton = 'button[type="submit"]';
    private readonly resultsContainer = '.results-container';
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
     * Get all search results
     */
    async getSearchResults(): Promise<string[]> {
        await this.waitForElement(this.resultsContainer);
        const results = await this.page.$$(`${this.resultsContainer} .result-item`);
        return Promise.all(results.map(async result => (await result.textContent()) || ''));
    }
} 