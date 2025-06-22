import React, { useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import TableRow from "./TableRow";
import type { Diagnostic } from "./types";
import "./VirtualizedTable.scss";

interface Props {
  diagnostics: Diagnostic[];
}

const ROW_HEIGHT = 50;
const TABLE_HEIGHT = 500;

const VirtualizedTable: React.FC<Props> = ({ diagnostics }) => {
  const sortedDiagnostics = useMemo(() => {
    return [...diagnostics].sort((a, b) => {
      const dateDiff =
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (dateDiff !== 0) return dateDiff;

      const severityOrder = { critical: 0, alarm: 1, healthy: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  }, [diagnostics]);

  return (
    <div className="table-container">
      <div className="table-header">
        <div>Date</div>
        <div>Type</div>
        <div>Severity</div>
      </div>
      <List
        height={TABLE_HEIGHT}
        itemCount={sortedDiagnostics.length}
        itemSize={ROW_HEIGHT}
        width="100%"
      >
        {({ index, style }) => (
          <TableRow
            key={sortedDiagnostics[index].id}
            diagnostic={sortedDiagnostics[index]}
            style={style}
          />
        )}
      </List>
    </div>
  );
};

export default VirtualizedTable;
