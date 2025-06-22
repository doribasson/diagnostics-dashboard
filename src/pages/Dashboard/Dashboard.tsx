import { useState } from "react";
import TrendChart from "../../components/TrendChart/TrendChart";
import AddDiagnosticModal from "../../components/Modal/AddDiagnosticModal.tsx";
import DiagnosticsTable from "../../components/DiagnosticsTable/DiagnosticsTable";
import Button from "../../components/UI/Button";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.chart}>{<TrendChart />}</div>

      <div className={styles.controls}>
        <h4>Diagnostics</h4>
        <Button variant="custom" onClick={() => setOpen(true)}>
          + Add new
        </Button>
      </div>
      <div className={styles.tableWrapper}>
        <DiagnosticsTable />
      </div>
      <AddDiagnosticModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Dashboard;
