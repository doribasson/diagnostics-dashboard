import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("app loads and shows sidebar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    await expect(page.getByText(/info/i)).toBeVisible();
  });

  test("navigate to Info page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /info/i }).click();
    await expect(page.getByText(/back/i)).toBeVisible();
    await expect(page.getByText(/info/i)).toBeVisible();
  });

  test("open add diagnostic modal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /add new/i }).click();
    await expect(page.getByText(/add new diagnostic/i)).toBeVisible();
    await expect(page.getByLabel("Fault type")).toBeVisible();
  });
});
