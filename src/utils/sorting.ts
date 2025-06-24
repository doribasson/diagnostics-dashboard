import { type Diagnostic } from "../features/diagnostics/types";

const severityOrder = { critical: 0, alarm: 1, healthy: 2 };

function getDayNumber(dateStr: string) {
  const d = new Date(dateStr);
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export const sortDiagnostics = (list: Diagnostic[]) => {
  return [...list].sort((a, b) => {
    const dayA = getDayNumber(a.created_at);
    const dayB = getDayNumber(b.created_at);
    if (dayA !== dayB) {
      return dayB - dayA; // מהחדש לישן
    }
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
