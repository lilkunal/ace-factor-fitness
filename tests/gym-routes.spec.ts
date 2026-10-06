import { expect, test, type Page } from "@playwright/test";

// Two CTAs link to /plans with the same accessible name (Hero and CallToAction),
// so an unscoped getByRole("link", { name: /View Plans/i }) trips strict mode.
// The hero is the only section on the home page that owns the h1.
const heroSection = (page: Page) => page.locator("section").filter({ has: page.locator("h1") });

test.describe("Ace Factor — gym routes", () => {
  test("home sells the gym, not a catalogue", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("BUILD");
    await expect(page.locator("h1")).toContainText("LEGACY");
    await expect(heroSection(page).getByRole("link", { name: /View Plans/i })).toBeVisible();
  });

  test("plans and coaches are real pages", async ({ page }) => {
    await page.goto("/");
    await heroSection(page).getByRole("link", { name: /View Plans/i }).click();
    await expect(page).toHaveURL(/\/plans\/?$/);
    await page.goto("/coaches");
    await expect(page).toHaveURL(/\/coaches\/?$/);
  });
});
