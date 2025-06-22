import { type Diagnostic } from "../features/diagnostics/types";

export const sortDiagnostics = (list: Diagnostic[]) => {
  const severityOrder = { critical: 0, alarm: 1, healthy: 2 };
  return [...list].sort((a, b) => {
    const dateDiff =
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (dateDiff !== 0) return dateDiff;
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
};

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};
