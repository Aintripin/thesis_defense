import React from "react";
import { keyInsights } from "../../data/benchmarkData";

export const KeyInsights: React.FC = () => {
  const isTablet = window.innerWidth <= 1200;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(15px)",
        borderRadius: "12px",
        padding: "1rem",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        width: "100%",
      }}
    >
      <h4
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#1e293b",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        💡 Ключевые инсайты
      </h4>
      {keyInsights.map((insight, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            marginBottom: "0.4rem",
            padding: isTablet ? "0.4rem" : "0.4rem",
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "6px",
          }}
        >
          <span
            style={{
              fontSize: isTablet ? "0.85rem" : "0.8rem",
              fontWeight: "bold",
              color: "#1e40af",
              minWidth: isTablet ? "32px" : "30px",
              flexShrink: 0,
            }}
          >
            {insight.number}
          </span>
          <span
            style={{
              fontSize: isTablet ? "0.75rem" : "0.7rem",
              color: "#475569",
              flex: 1,
              lineHeight: "1.3",
            }}
          >
            {insight.text}
          </span>
        </div>
      ))}
    </div>
  );
};
