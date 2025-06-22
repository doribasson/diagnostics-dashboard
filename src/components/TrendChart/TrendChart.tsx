import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAppSelector } from "../../hooks/hook";
import { getDailyMaxSeverity } from "../../utils/groupByDay";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TrendChart.module.scss";

const severityScore = {
  healthy: 3,
  alarm: 2,
  critical: 1,
};

const severityColor = {
  healthy: "#2ecc71", // green
  alarm: "#f39c12", // orange
  critical: "#e74c3c", // red
};

const TrendChart = () => {
  const diagnostics = useAppSelector((state) => state.diagnostics.list);

  const data = useMemo(() => {
    const daily = getDailyMaxSeverity(diagnostics);
    return daily.map((d) => ({
      ...d,
      score: severityScore[d.severity],
      id: d.id || uuidv4(), // Ensure unique id
    }));
  }, [diagnostics]);

  // Custom tick for XAxis to render all date labels under the axis
  const renderCustomTick = (props: any) => {
    const { x, y, payload } = props;
    // Find the matching data object by created_at
    const dataObj = data.find((d) => d.created_at === payload.value);
    const dateLabel = dataObj ? formatDate(dataObj.created_at) : "";
    if (!dateLabel) return <g />;
    return (
      <text x={x} y={y + 20} textAnchor="middle" fontSize={10} fill="#555">
        {dateLabel}
      </text>
    );
  };

  // Helper to format date as 'MonthName Day' (e.g. June 27)
  const formatDate = (dateInput: string | Date) => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "";
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${month} ${day}`;
  };

  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (typeof cx !== "number" || typeof cy !== "number") return <g />;
    // Raise the dot a bit
    const dotY = cy - 6;
    return (
      <g key={payload.id}>
        {/* Dashed line from X axis to dot */}
        <line
          x1={cx}
          x2={cx}
          y1={cy + 8}
          y2={dotY}
          stroke="#bbb"
          strokeDasharray="3 3"
          strokeWidth={1}
        />
        {/* Dot */}
        <circle
          cx={cx}
          cy={dotY}
          r={5}
          fill={severityColor[payload.severity as keyof typeof severityColor]}
          stroke="white"
          strokeWidth={1.5}
        />
      </g>
    );
  };

  return (
    <div
      className={styles.wrapper}
      style={{ background: "#e6e8ec", padding: 8 }}
    >
      <div
        className={styles.header}
        style={{
          background: "#e6e8ec",
          borderRadius: 8,
          padding: "8px 16px",
          marginBottom: 8,
        }}
      >
        <span>📈 Fusion trend</span>
        <span className={styles.date}>📅 From 14.05.2024</span>
      </div>
      <ResponsiveContainer
        width="100%"
        height={200}
        style={{ background: "#fff", borderRadius: 8 }}
      >
        <LineChart
          data={data}
          margin={{ top: 16, right: 32, left: 32, bottom: 16 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={true}
            horizontal={false}
          />
          <XAxis
            dataKey="created_at"
            interval={0}
            minTickGap={0}
            tick={renderCustomTick}
          />
          <YAxis domain={[3, 1]} ticks={[3, 2, 1]} hide />
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div className={styles.tooltip}>
                  <div>Severity: {payload[0].payload.severity}</div>
                  <div>Fault type: {payload[0].payload.type}</div>
                </div>
              ) : null
            }
          />
          <Line
            type="linear"
            dataKey="score"
            stroke="#BDC3C7"
            dot={renderCustomDot}
            strokeWidth={2}
            key="trend-line"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
