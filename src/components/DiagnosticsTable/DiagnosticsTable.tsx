import { FixedSizeList as List } from "react-window";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchDiagnosticsFromJson } from "../../features/diagnostics/diagnosticsSlice";
import { sortDiagnostics } from "../../utils/sorting";
import TableRow from "./TableRow";
import styles from "./DiagnosticsTable.module.scss";
import { useEffect, useMemo } from "react";
import type { Diagnostic } from "../../features/diagnostics/types";

const ROW_HEIGHT = 50;

const DiagnosticsTable = () => {
  const dispatch = useAppDispatch();
  const diagnostics = useAppSelector((state) => state.diagnostics.list);
  const loading = useAppSelector((state) => state.diagnostics.loading);
  const error = useAppSelector((state) => state.diagnostics.error);

  useEffect(() => {
    dispatch(fetchDiagnosticsFromJson());
  }, [dispatch]);

  const sortedDiagnostics = useMemo(
    () => sortDiagnostics(diagnostics),
    [diagnostics]
  );

  if (loading) return <div>טוען נתונים...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.label}>Diagnostic date</div>
        <div className={styles.label}>Fault type</div>
        <div className={styles.label}>Severity</div>
      </div>
      <List
        height={300}
        itemCount={sortedDiagnostics.length}
        itemSize={ROW_HEIGHT}
        width="100%"
      >
        {({ index, style }: { index: number; style: React.CSSProperties }) => {
          const row = sortedDiagnostics[index];
          if (!row?.id) {
            console.warn("Missing id for row:", row, "at index", index);
          }
          return (
            <TableRow
              key={`${row.id}-${index}`}
              diagnostic={row}
              style={style}
            />
          );
        }}
      </List>
    </div>
  );
};

export default DiagnosticsTable;
