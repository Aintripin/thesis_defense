import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dbmsGrowth } from "../../data/benchmarkData";
import { CustomTooltip } from "../ui/CustomTooltip";

export const DbmsGrowthChart: React.FC = () => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#1e293b",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        💾 Динамика роста рынка СУБД по типам
      </h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={420}>
          <AreaChart
            data={dbmsGrowth}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorNoSQL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorGraph" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} />
            <Tooltip
              content={<CustomTooltip />}
              formatter={(value: number) => [`${value} млрд USD`, ""]}
            />
            <Area
              type="monotone"
              dataKey="relational"
              stackId="1"
              stroke="#1E3A8A"
              fill="url(#colorRel)"
              strokeWidth={2}
              name="Реляционные"
            />
            <Area
              type="monotone"
              dataKey="cloud"
              stackId="1"
              stroke="#60A5FA"
              fill="url(#colorCloud)"
              strokeWidth={2}
              name="Облачные"
            />
            <Area
              type="monotone"
              dataKey="nosql"
              stackId="1"
              stroke="#3B82F6"
              fill="url(#colorNoSQL)"
              strokeWidth={2}
              name="NoSQL"
            />
            <Area
              type="monotone"
              dataKey="graph"
              stackId="1"
              stroke="#93C5FD"
              fill="url(#colorGraph)"
              strokeWidth={2}
              name="Графовые"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
