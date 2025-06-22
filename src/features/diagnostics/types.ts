export interface Diagnostic {
  id: string;
  created_at: string;
  type: "bearing" | "gear" | "motor";
  severity: "healthy" | "alarm" | "critical";
}
