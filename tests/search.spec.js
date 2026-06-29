import { test, expect } from "@playwright/test";

test("Search functionality using inline locators with screenshot", async ({ page }) => {

  await page.goto("https://demowebshop.tricentis.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });


  const searchBox = page.locator("#small-searchterms");
  const searchButton = page.locator("input.button-1.search-box-button");
  const searchResults = page.locator(".product-item");
  const firstResultLink = page.locator('//div[contains(@class,"product-item")]//h2/a').first();

  await searchBox.fill("computer");
  await searchButton.click();

  await expect(searchResults.first()).toContainText("computer", { timeout: 5000 });

  await page.screenshot({ path: "screenshots/search-results.png", fullPage: true });

  await firstResultLink.click();
  await page.waitForLoadState("networkidle");

  await page.screenshot({ path: "screenshots/search-first-result.png", fullPage: true });

  await page.waitForTimeout(3000);
});
