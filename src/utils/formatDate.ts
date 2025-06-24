// פונקציה לייצוא - פורמט תאריך 'MonthName Day' (לגרפים)
export function formatDateMonthDay(dateInput: string | Date): string {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", { month: "long", day: "numeric" });
}
