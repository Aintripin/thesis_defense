import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { industryData } from "../../data/benchmarkData";
import { CustomTooltip } from "../ui/CustomTooltip";

export const IndustryAdoptionChart: React.FC = () => {
  const displayData = industryData.slice(0, 8);

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
        🏢 Внедрение бенчмаркинга по отраслям
      </h3>

      {/* Основной контейнер с графиком и подписями */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "-10px",
        }}
      >
        {/* График */}
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={displayData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="shortName"
              stroke="#64748B"
              fontSize={10}
              tick={false} // Убираем подписи из самого графика
            />
            <YAxis stroke="#64748B" fontSize={12} domain={[0, 80]} />
            <Tooltip
              content={<CustomTooltip />}
              formatter={(value: number) => [`${value}%`, "Процент компаний"]}
            />
            <Bar dataKey="percent" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="percent"
                position="top"
                fontSize={11}
                fill="#1e293b"
                formatter={(value: number) => `${value}%`}
              />
              {displayData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(${220 + index * 8}, 70%, ${75 - index * 4}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Внешние подписи */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            paddingLeft: "4.5rem",
            paddingRight: "1.4rem",
            marginTop: "-2.3rem",
          }}
        >
          {displayData.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: "10px",
                color: "#64748B",
                textAlign: "center",
                whiteSpace: "nowrap",
                width: "50px",
              }}
            >
              {item.shortName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
