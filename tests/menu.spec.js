import { test, expect } from "@playwright/test";

test("Validate Demo Web Shop menu navigation with hover", async ({ page }) => {
  // Step 1: Navigate to site
  await page.goto("https://demowebshop.tricentis.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // Step 2: Get all main menus
  const menus = page.locator(".top-menu > li");
  const menuCount = await menus.count();

  // Step 3: Hover over each menu and validate submenus
  for (let i = 0; i < menuCount; i++) {
    const menuName = await menus.nth(i).textContent();
    console.log(`Main Menu: ${menuName?.trim()}`);

    // Hover over each main menu
    await menus.nth(i).hover();

    // Get submenus under the hovered menu
    const subMenus = menus.nth(i).locator("ul li");
    const subCount = await subMenus.count();

    for (let j = 0; j < subCount; j++) {
      const subMenuName = await subMenus.nth(j).textContent();
      console.log(`   Sub Menu: ${subMenuName?.trim()}`);

      // Assertion: submenu name should not be empty
      expect(subMenuName?.trim()).not.toBe("");
    }

    // Small pause so hover effect is visible
    await page.waitForTimeout(1000);
  }

  // Step 4: Pause for observation at the end
  await page.waitForTimeout(5000);
});
