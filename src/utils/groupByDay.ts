import type { Diagnostic } from "../features/diagnostics/types";

const severityOrder = { critical: 0, alarm: 1, healthy: 2 };

export const getDailyMaxSeverity = (diagnostics: Diagnostic[]) => {
  if (!diagnostics.length) return [];
  const grouped: Record<string, Diagnostic> = {};

  diagnostics.forEach((diag) => {
    const dateKey = diag.created_at.split("T")[0]; // YYYY-MM-DD
    const existing = grouped[dateKey];
    if (
      !existing ||
      severityOrder[diag.severity] < severityOrder[existing.severity]
    ) {
      grouped[dateKey] = diag;
    }
  });

  // Return only the most severe diagnostic for each unique date, sorted by date descending (like the table)
  return Object.values(grouped).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};
