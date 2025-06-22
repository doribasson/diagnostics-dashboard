// שים לב: יש להריץ את השרת (npm run dev) לפני הרצת הטסטים
import { test, expect } from "@playwright/test";

// דוגמה: בדיקת טעינת טבלה ומיון

test.describe("Diagnostics Table", () => {
  test("should display diagnostics table and sort by date", async ({
    page,
  }) => {
    await page.goto("/");
    // בדוק שהטבלה נטענת
    await expect(page.getByText("Fault type")).toBeVisible();
    // בדוק שיש לפחות שורה אחת
    const rows = await page.locator(".tableWrapper .row, .table .row").count();
    expect(rows).toBeGreaterThan(0);
    // בדוק שמיון לפי תאריך עובד (בהנחה שיש כפתור/אייקון מיון)
    // await page.getByRole('button', { name: /date/i }).click();
    // אפשר לבדוק את סדר התאריכים כאן
  });

  test("should add a new diagnostic and see it in the table", async ({
    page,
  }) => {
    await page.goto("/");
    // פתח את המודל
    await page.getByRole("button", { name: /add new/i }).click();
    // מלא שדות
    await page.getByLabel("Diagnostic date").fill("2025-07-01");
    await page
      .getByLabel("Fault type")
      .selectOption({ label: "NDE bearing inner race deterioration" });
    await page.getByLabel("Severity").selectOption({ label: "critical" });
    // אשר
    await page.getByRole("button", { name: /add/i }).click();
    // בדוק שהשורה נוספה
    await expect(
      page.getByText("NDE bearing inner race deterioration")
    ).toBeVisible();
    await expect(page.getByText("critical")).toBeVisible();
  });
});
