import { test, expect } from "@playwright/test";

test.describe("Login Scenarios", () => {
  test("@regression Login with valid credentials", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.waitFor({ state: "visible", timeout: 10000 });
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    await page.locator("#Email").fill("abhianime1018@gmail.com");
    await page.locator("#Password").fill("Password123!");
    await page.locator('input[value="Log in"]').click();

    const logoutLink = page.locator('//a[text()="Log out"]');
    await expect(logoutLink).toBeVisible({ timeout: 10000 });
  });

  test("@regression Login with invalid credentials shows error", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    await page.locator("#Email").fill("wronguser@example.com");
    await page.locator("#Password").fill("WrongPassword!");
    await page.locator('input[value="Log in"]').click();

    const errorMessage = page.locator(".message-error, .validation-summary-errors li").first();
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    await expect(errorMessage).toContainText("Login was unsuccessful", { timeout: 10000 });
  });
});
