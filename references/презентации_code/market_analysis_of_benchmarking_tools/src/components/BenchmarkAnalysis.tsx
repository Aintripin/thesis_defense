import { RegionalTrendsChart } from "./charts/RegionalTrendsChart";
import { PopularityTrendsChart } from "./charts/PopularityTrendsChart";
import { DbmsGrowthChart } from "./charts/DbmsGrowthChart";
import { IndustryAdoptionChart } from "./charts/IndustryAdoptionChart";
import { MarketShareChart } from "./charts/MarketShareChart";
import { KeyMetrics } from "./ui/KeyMetrics";
import { KeyInsights } from "./ui/KeyInsights";

export default function BenchmarkMarketAnalysis() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1200;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        padding: "1rem",
        fontFamily: "Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
        paddingBottom: "-10px",
      }}
    >
      {/* Заголовок */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
            letterSpacing: "1px",
          }}
        >
          АНАЛИЗ РЫНКА ИНСТРУМЕНТОВ БЕНЧМАРКИНГА
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            color: "#475569",
            letterSpacing: "0.5px",
          }}
        >
          Глобальные тенденции и структурные изменения рынка СУБД
        </p>
      </div>

      {/* Основная сетка */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1fr 380px",
          gap: "1.5rem",
          width: "100%",
          height: "calc(100vh - 200px)",
        }}
      >
        {/* Левая панель - 4 графика в сетке 2x2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <RegionalTrendsChart />
          <PopularityTrendsChart />
          <DbmsGrowthChart />
          <IndustryAdoptionChart />
        </div>

        {/* Правая панель - узкий sidebar */}
        {!isTablet && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <MarketShareChart />
            <KeyMetrics />
            <KeyInsights />
          </div>
        )}
      </div>

      {/* Мобильная версия нижней панели */}
      {isTablet && (
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            <MarketShareChart />
            <KeyMetrics />
            {!isMobile && <KeyInsights />}
          </div>
          {isMobile && (
            <div style={{ marginTop: "1.5rem" }}>
              <KeyInsights />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
