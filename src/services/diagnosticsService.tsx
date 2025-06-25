import { mockDiagnostics } from "../mock/diagnosticsMock";

export const diagnosticsService = {
  fetchDiagnostics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDiagnostics);
      }, 300);
    });
  },
  fetchDiagnosticsFromJson: async () => {
    // Fetch diagnostics from JSON file using fetch API
    const response = await fetch("/mock/diagnosticsMock.json");
    // Let errors be thrown naturally, don't catch here
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  },
};
