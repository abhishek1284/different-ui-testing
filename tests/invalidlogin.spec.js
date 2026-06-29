import { test, expect } from "@playwright/test";

test.describe("Invalid Login Scenarios", () => {
  test("Invalid login with wrong email shows validation error", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    await page.locator('//*[@id="Email"]').fill("wrong.email@example.com");
    await page.locator('//*[@id="Password"]').fill("Password123!");
    await page.locator('input[value="Log in"]').click();

    await page.screenshot({ path: "screenshots/invalid-login-wrong-email.png" });

    const errorMessage = page.locator(".message-error, .validation-summary-errors li").first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Login was unsuccessful");

    await page.waitForTimeout(7000);
  });

  test("Invalid login with wrong password shows validation error", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const loginLink = page.locator('//a[text()="Log in"]');
    await loginLink.click();
    await expect(page).toHaveURL(/login/);

    await page.locator('//*[@id="Email"]').fill("abhianime1018@gmail.com");
    await page.locator('//*[@id="Password"]').fill("WrongPassword!");
    await page.locator('input[value="Log in"]').click();

    
    await page.screenshot({ path: "screenshots/invalid-login-wrong-password.png" });

    const errorMessage = page.locator(".message-error, .validation-summary-errors li").first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Login was unsuccessful");

    await page.waitForTimeout(7000);
  });
});
