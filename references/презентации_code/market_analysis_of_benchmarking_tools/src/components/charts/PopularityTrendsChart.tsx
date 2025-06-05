import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { popularityTrends } from "../../data/benchmarkData";
import { CustomTooltip } from "../ui/CustomTooltip";

export const PopularityTrendsChart: React.FC = () => {
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
        📈 Тренды популярности бенчмарков
      </h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={420}>
          <LineChart
            data={popularityTrends}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} domain={[0, 40]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="ycsb"
              stroke="#1E3A8A"
              strokeWidth={3}
              dot={{ fill: "#1E3A8A", strokeWidth: 2, r: 4 }}
              name="YCSB"
            >
              <LabelList
                dataKey="ycsb"
                position="top"
                fontSize={10}
                fill="#1E3A8A"
              />
            </Line>
            <Line
              type="monotone"
              dataKey="tpcC"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              name="TPC-C"
            >
              <LabelList
                dataKey="tpcC"
                position="bottom"
                fontSize={10}
                fill="#3B82F6"
              />
            </Line>
            <Line
              type="monotone"
              dataKey="tpcH"
              stroke="#60A5FA"
              strokeWidth={3}
              dot={{ fill: "#60A5FA", strokeWidth: 2, r: 4 }}
              name="TPC-H"
            >
              <LabelList
                dataKey="tpcH"
                position="bottom"
                fontSize={10}
                fill="#60A5FA"
              />
            </Line>
            <Line
              type="monotone"
              dataKey="hammerdb"
              stroke="#93C5FD"
              strokeWidth={2}
              dot={{ fill: "#93C5FD", strokeWidth: 2, r: 3 }}
              name="HammerDB"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
