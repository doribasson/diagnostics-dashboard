import React from "react";
import type { Diagnostic } from "./types";
import { formatDate } from "../../utils/sorting";
import styles from "./TableRow.module.scss";

interface Props {
  diagnostic: Diagnostic;
  style: React.CSSProperties;
}

const TableRow: React.FC<Props> = ({ diagnostic, style }) => {
  return (
    <div className={styles.row} style={style}>
      <div>{formatDate(diagnostic.created_at)}</div>
      <div>{diagnostic.type}</div>
      <div>{diagnostic.severity}</div>
    </div>
  );
};

export default React.memo(TableRow);
