import React from "react";
import type { CustomTooltipProps } from "../../types/charts";

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(15px)",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          fontSize: "0.8rem",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            marginBottom: "0.25rem",
            color: "#1e293b",
          }}
        >
          {`${label}`}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name || entry.dataKey}: ${entry.value}${
              entry.unit || "%"
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
