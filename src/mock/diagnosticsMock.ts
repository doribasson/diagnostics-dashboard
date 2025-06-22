import { v4 as uuidv4 } from "uuid";
import type { Diagnostic } from "../features/diagnostics/types";

export const mockDiagnostics: Diagnostic[] = [
  {
    id: uuidv4(),
    created_at: "2025-06-18T12:00:00Z",
    type: "bearing",
    severity: "critical",
  },
  {
    id: uuidv4(),
    created_at: "2025-06-18T10:30:00Z",
    type: "gear",
    severity: "alarm",
  },
  {
    id: uuidv4(),
    created_at: "2025-06-17T09:15:00Z",
    type: "motor",
    severity: "healthy",
  },
  {
    id: uuidv4(),
    created_at: "2025-06-27T09:15:00Z",
    type: "motor",
    severity: "alarm",
  },
  {
    id: uuidv4(),
    created_at: "2025-06-07T09:15:00Z",
    type: "motor",
    severity: "critical",
  },
  {
    id: uuidv4(),
    created_at: "2025-02-17T09:15:00Z",
    type: "motor",
    severity: "critical",
  },
  {
    id: uuidv4(),
    created_at: "2025-02-17T09:15:00Z",
    type: "motor",
    severity: "alarm",
  },
  // ...עוד
];
