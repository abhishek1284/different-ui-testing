import { test, expect } from "@playwright/test";

test("Search functionality using inline locators with screenshot", async ({ page }) => {
  // Step 1: Navigate to site
  await page.goto("https://demowebshop.tricentis.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // Step 2: Perform search
  const searchBox = page.locator("#small-searchterms");
  const searchButton = page.locator("input.button-1.search-box-button");
  const searchResults = page.locator(".product-item");
  const firstResultLink = page.locator('//div[contains(@class,"product-item")]//h2/a').first();

  await searchBox.fill("computer");
  await searchButton.click();

  // Step 3: Verify results contain search term
  await expect(searchResults.first()).toContainText("computer", { timeout: 5000 });

  // Step 4: Take screenshot of search results page
  await page.screenshot({ path: "screenshots/search-results.png", fullPage: true });

  // Step 5: Open first result
  await firstResultLink.click();
  await page.waitForLoadState("networkidle");

  // Step 6: Take screenshot of product detail page
  await page.screenshot({ path: "screenshots/search-first-result.png", fullPage: true });

  // Step 7: Pause for observation
  await page.waitForTimeout(3000);
});
