import { test, expect } from '@playwright/test';
import { OpsifyPage } from '../pages/OpsifyPage';
import { ScreenshotUtil } from '../utils/screenshot';

test.describe('Opsify Website Tests', () => {
    let opsifyPage: OpsifyPage;

    test.beforeEach(async ({ page }) => {
        opsifyPage = new OpsifyPage(page);
        await opsifyPage.navigate();
        // Take screenshot of initial page load
        await ScreenshotUtil.takeScreenshot(page, 'initial-page-load');
    });

    test('should load the homepage successfully', async ({ page }) => {
        const title = await opsifyPage.getPageTitle();
        expect(title).toBe('DevOpsify Check');
        // Take screenshot after verifying title
        await ScreenshotUtil.takeScreenshot(page, 'homepage-loaded');
    });

    test('should perform a search and display results', async ({ page }) => {
        const searchQuery = 'istio';
        
        // Test search using button click
        await opsifyPage.search(searchQuery);
        await opsifyPage.waitForLoadingToComplete();
        await ScreenshotUtil.takeScreenshot(page, 'search-results-button-click');

        const resultsVisible = await opsifyPage.areResultsVisible();
        expect(resultsVisible).toBeTruthy();

        const results = await opsifyPage.getSearchResults();
        expect(results.length).toBeGreaterThan(0);

        // Take screenshot of specific result if available
        if (results.length > 0) {
            await ScreenshotUtil.takeElementScreenshot(page, '.result-item:first-child', 'first-result-button-click');
        }

        // Navigate back to homepage
        await opsifyPage.navigate();
        await opsifyPage.waitForPageLoad();

        // Test search using Enter key
        await opsifyPage.searchWithEnter(searchQuery);
        await opsifyPage.waitForLoadingToComplete();
        await ScreenshotUtil.takeScreenshot(page, 'search-results-enter-key');

        const resultsVisibleEnter = await opsifyPage.areResultsVisible();
        expect(resultsVisibleEnter).toBeTruthy();

        const resultsEnter = await opsifyPage.getSearchResults();
        expect(resultsEnter.length).toBeGreaterThan(0);

        // Take screenshot of specific result if available
        if (resultsEnter.length > 0) {
            await ScreenshotUtil.takeElementScreenshot(page, '.result-item:first-child', 'first-result-enter-key');
        }
    });
    
    test('should maintain search functionality after multiple searches', async ({ page }) => {
        const queries = ['istio', 'postgresql', 'kubernetes'];
        
        for (const [index, query] of queries.entries()) {
            await opsifyPage.search(query);
            await opsifyPage.waitForLoadingToComplete();
            
            // Take screenshot for each search
            await ScreenshotUtil.takeScreenshot(page, `search-${index + 1}`);
            
            const resultsVisible = await opsifyPage.areResultsVisible();
            expect(resultsVisible).toBeTruthy();
        }
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Take screenshot on test failure
        if (testInfo.status === 'failed') {
            await ScreenshotUtil.takeScreenshot(page, `failed-${testInfo.title}`);
        }
    });
}); 