import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { benchmarkTypes } from "../../data/benchmarkData";

export const MarketShareChart: React.FC = () => {
  const isTablet = window.innerWidth <= 1200;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        padding: "1rem",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        width: "100%",
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
        🎯 Рыночная доля
      </h3>
      <ResponsiveContainer width="100%" height={isTablet ? 180 : 200}>
        <PieChart>
          <Pie
            data={benchmarkTypes}
            cx="50%"
            cy="50%"
            innerRadius={isTablet ? 40 : 40}
            outerRadius={isTablet ? 80 : 90}
            paddingAngle={2}
            dataKey="value"
          >
            {benchmarkTypes.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}%`, "Доля рынка"]} />
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        {benchmarkTypes.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.8rem",
              color: "#475569",
              padding: "0.3rem 0.4rem",
              background: "rgba(255, 255, 255, 0.4)",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                backgroundColor: item.color,
                flexShrink: 0,
              }}
            />
            <span style={{ lineHeight: "1.2" }}>
              {item.type} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
