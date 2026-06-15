import { test, expect } from "@playwright/test";

test.describe("Invalid Login Scenarios", () => {
  test("Invalid login with wrong email shows validation error", async ({ page }) => {
    // Step 1: Navigate to site
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Step 2: Open Login page
    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    // Step 3: Try invalid login (wrong email)
    await page.locator('//*[@id="Email"]').fill("wrong.email@example.com");
    await page.locator('//*[@id="Password"]').fill("Password123!");
    await page.locator('input[value="Log in"]').click();

    // Step 4: Screenshot
    await page.screenshot({ path: "screenshots/invalid-login-wrong-email.png" });

    // Step 5: Verify error
    const errorMessage = page.locator(".message-error, .validation-summary-errors li").first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Login was unsuccessful");

    await page.waitForTimeout(7000);
  });

  test("Invalid login with wrong password shows validation error", async ({ page }) => {
    // Step 1: Navigate to site
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Step 2: Open Login page
    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    // Step 3: Try invalid login (wrong password)
    await page.locator('//*[@id="Email"]').fill("abhianime1018@gmail.com");
    await page.locator('//*[@id="Password"]').fill("WrongPassword!");
    await page.locator('input[value="Log in"]').click();

    // Step 4: Screenshot
    await page.screenshot({ path: "screenshots/invalid-login-wrong-password.png" });

    // Step 5: Verify error
    const errorMessage = page.locator(".message-error, .validation-summary-errors li").first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Login was unsuccessful");

    await page.waitForTimeout(7000);
  });
});
