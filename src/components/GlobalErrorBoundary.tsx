import { ErrorBoundary } from "react-error-boundary";
import React from "react";

const GlobalErrorBoundary: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => (
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <div style={{ padding: 32, textAlign: "center", color: "#c00" }}>
        <h2>משהו השתבש 😥</h2>
        <pre style={{ direction: "ltr", color: "#a00" }}>{error.message}</pre>
        <p>אנא נסה לרענן את הדף או פנה לתמיכה.</p>
      </div>
    )}
  >
    {children}
  </ErrorBoundary>
);

export default GlobalErrorBoundary;
