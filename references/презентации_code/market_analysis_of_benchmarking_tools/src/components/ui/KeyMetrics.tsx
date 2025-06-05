import React from "react";
import { keyMetrics } from "../../data/benchmarkData";

export const KeyMetrics: React.FC = () => {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1200;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isTablet
          ? isMobile
            ? "repeat(2, 1fr)"
            : "repeat(4, 1fr)"
          : "repeat(2, 1fr)",
        gridTemplateRows: isTablet ? "auto" : "repeat(2, 1fr)",
        gap: "0.8rem",
        flex: isTablet ? 1 : "none",
      }}
    >
      {keyMetrics.map((metric, index) => (
        <div
          key={index}
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(15px)",
            borderRadius: "12px",
            padding: isTablet ? "1rem" : "1rem",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.7)",
          }}
        >
          <div
            style={{
              fontSize: isTablet ? "1.5rem" : "1.4rem",
              marginBottom: "0.5rem",
            }}
          >
            {metric.icon}
          </div>
          <div
            style={{
              fontSize: isTablet ? "1.2rem" : "1.1rem",
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "0.25rem",
            }}
          >
            {metric.value}
          </div>
          <div
            style={{
              fontSize: isTablet ? "0.8rem" : "0.75rem",
              color: "#64748b",
            }}
          >
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};
