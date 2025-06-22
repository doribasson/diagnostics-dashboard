import { mockDiagnostics } from "../mock/diagnosticsMock";

export const diagnosticsService = {
  fetchDiagnostics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDiagnostics);
      }, 300); // סימולציה לקריאה מהשרת
    });
  },
};
