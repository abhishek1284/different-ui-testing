import { test, expect } from "@playwright/test";

test.describe("Login Scenarios", () => {
  test("Login with valid credentials", async ({ page }) => {
    // Step 1: Go to site
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Step 2: Open Login page
    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.waitFor({ state: "visible", timeout: 10000 });
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    // Step 3: Enter credentials
    await page.locator('//*[@id="Email"]').fill("abhianime1018@gmail.com");
    await page.locator('//*[@id="Password"]').fill("Password123!");
    await page.locator('input[value="Log in"]').click();

    // Step 4: Verify success
    const logoutLink = page.locator('//a[text()="Log out"]');
    await expect(logoutLink).toBeVisible();
  });

  test("Login with invalid credentials shows error", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    await page.locator('//*[@id="Email"]').fill("wronguser@example.com");
    await page.locator('//*[@id="Password"]').fill("WrongPassword!");
    await page.locator('input[value="Log in"]').click();

    const errorMessage = page.locator('.message-error, .validation-summary-errors li').first();
    await expect(errorMessage).toBeVisible({ timeout: 2000 });
    await expect(errorMessage).toContainText("Login was unsuccessful");
  });
});
