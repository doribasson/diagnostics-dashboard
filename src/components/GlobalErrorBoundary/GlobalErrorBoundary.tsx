import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import styles from "./GlobalErrorBoundary.module.scss";

const GlobalErrorBoundary: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => (
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <div className={styles.errorBoundary}>
        <h2>Something went wrong 😥</h2>
        <pre>{error.message}</pre>
        <p>Please try refreshing the page or contact support.</p>
      </div>
    )}
  >
    {children}
  </ErrorBoundary>
);

export default GlobalErrorBoundary;
