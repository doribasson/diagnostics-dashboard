import { test, expect } from "@playwright/test";

test.describe("Diagnostics Table Sorting", () => {
  test("should sort diagnostics by date descending and ascending", async ({
    page,
  }) => {
    await page.goto("/");
    // נניח שיש כפתור/אייקון מיון על העמודה "Diagnostic date"
    // לחץ פעם אחת - אמור למיין מהחדש לישן
    await page.getByText(/diagnostic date/i).click();
    // קבל את כל התאריכים מהשורות
    const dates = await page
      .locator(".row > div:first-child")
      .allTextContents();
    // ודא שהתאריכים ממוינים מהחדש לישן (פשוט בדיקה בסיסית)
    const sorted = [...dates].sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
    expect(dates).toEqual(sorted);
    // לחץ שוב - אמור למיין מהישן לחדש
    await page.getByText(/diagnostic date/i).click();
    const datesAsc = await page
      .locator(".row > div:first-child")
      .allTextContents();
    const sortedAsc = [...datesAsc].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    expect(datesAsc).toEqual(sortedAsc);
  });
});
