import { useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { addDiagnostic } from "../../features/diagnostics/diagnosticsSlice";
import { v4 as uuidv4 } from "uuid";
import Input from "../UI/Input";
import Button from "../UI/Button";
import styles from "./AddDiagnosticModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddDiagnosticModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [createdAt, setCreatedAt] = useState("");
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!createdAt || !type || !severity) return;
    dispatch(
      addDiagnostic({
        id: uuidv4(),
        created_at: new Date(createdAt).toISOString(),
        type: type as any,
        severity: severity as any,
      })
    );
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Add new diagnostic</h3>

        <div className={styles.field}>
          <label>Diagnostic date</label>
          <Input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Fault type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select...</option>
            <option value="NDE bearing inner race deterioration">
              NDE bearing inner race deterioration
            </option>
            <option value="NDE bearing mechanical looseness">
              NDE bearing mechanical looseness
            </option>
            <option value="Motor anomaly detected">
              Motor anomaly detected
            </option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="healthy">Healthy</option>
            <option value="alarm">Alarm</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className={styles.actions}>
          <Button variant="custom" className={styles.cancel} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="custom"
            className={styles.save}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDiagnosticModal;
