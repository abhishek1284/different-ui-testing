import { test, expect } from "@playwright/test";

test.describe("Registration Scenarios", () => {
  test("Register new user successfully with unique email", async ({ page }) => {
    // Step 1: Go to site
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Step 2: Open Register page
    const registerLink = page.locator("a.ico-register");
    await registerLink.waitFor({ state: "visible", timeout: 10000 });
    await registerLink.click();
    await expect(page).toHaveURL(/register/);

    // Step 3: Fill registration form with unique email
    await page.locator("#gender-male").check();
    await page.locator("#FirstName").fill("Abhishek");
    await page.locator("#LastName").fill("Pradhan");
    const uniqueEmail = `user${Date.now()}@example.com`; // ensures uniqueness
    const password = "Password123!";
    await page.locator("#Email").fill(uniqueEmail);
    await page.locator("#Password").fill(password);
    await page.locator("#ConfirmPassword").fill(password);

    // Step 4: Submit
    await page.locator('input[name="register-button"]').click();

    // Step 5: Verify success
    await expect(page.locator(".result")).toHaveText("Your registration completed");
    await expect(page.locator("a.ico-logout")).toBeVisible();

    // Step 6: Keep dashboard visible for 5 seconds
    await page.waitForTimeout(5000);
  });

  test("Register with duplicate email shows error", async ({ page }) => {
    // Step 1: Go to site
    await page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Step 2: Open Register page
    const registerLink = page.locator("a.ico-register");
    await registerLink.waitFor({ state: "visible", timeout: 10000 });
    await registerLink.click();
    await expect(page).toHaveURL(/register/);

    // Step 3: Fill registration form with duplicate email
    await page.locator("#gender-male").check();
    await page.locator("#FirstName").fill("Test");
    await page.locator("#LastName").fill("User");
    const duplicateEmail = "abhianime1018@gmail.com"; // already registered email
    const password = "Password123!";
    await page.locator("#Email").fill(duplicateEmail);
    await page.locator("#Password").fill(password);
    await page.locator("#ConfirmPassword").fill(password);

    // Step 4: Submit
    await page.locator('input[name="register-button"]').click();

    // Step 5: Verify duplicate error
    const errorMessage = page.locator(".validation-summary-errors li");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("The specified email already exists");

    // Step 6: Keep error visible for 5 seconds
    await page.waitForTimeout(5000);
  });
});
