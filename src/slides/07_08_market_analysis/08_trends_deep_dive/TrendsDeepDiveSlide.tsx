import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import './TrendsDeepDiveSlide.scss'; // SCSS import updated
import { MarketShareDonutChart } from './components/MarketShareDonutChart';
import { RegionalTrendsAreaChart } from './components/RegionalTrendsAreaChart'; 
import { PopularityTrendsLineChart } from './components/PopularityTrendsLineChart';
import { EnergyEfficiencyLineChart } from './components/EnergyEfficiencyLineChart';
import { IndustryAdoptionBarChart } from './components/IndustryAdoptionBarChart';

// Data for Sidebar Metric Cards - REMAINS
const keyMetricsData = [
  { icon: "💰", value: "292.22B", label: "USD к 2030" },
  { icon: "📈", value: "+14.21%", label: "CAGR" },
  { icon: "🚀", value: "6x", label: "NoSQL рост" },
  { icon: "☁️", value: "5.4x", label: "Облачные" },
];

const keyInsightsData = [
  { number: "31%", text: "YCSB опережает TPC-H по популярности для новых проектов" },
  { number: "2022", text: "Год признан точкой смены парадигм в пользу NoSQL и облаков" },
  { number: "+77%", text: "Азиатско-Тихоокеанский регион показывает самый быстрый рост внедрения" },
  { number: "78%", text: "Финансовый сектор лидирует по глубине использования бенчмаркинга" },
];

// All other data constants (benchmarkTypesData, regionTrendsData, popularityTrendsData, industryData, energyEfficiencyRawData)
// and category constants (regionalChartCategories, popularityChartCategories, energyChartCategories)
// have been moved to their respective chart components.

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  variant: 'metrics' | 'trends' | 'insights' | 'donuts';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, children, delay = 0, variant }) => (
  <motion.div
    className={`glass-card ${variant}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="card-title">{title}</div>
    {children}
  </motion.div>
);

export const TrendsDeepDiveSlide: React.FC = () => {
  const regionalTrendsChartContainerRef = useRef<HTMLDivElement>(null);
  const popularityTrendsChartContainerRef = useRef<HTMLDivElement>(null);
  const industryAdoptionChartContainerRef = useRef<HTMLDivElement>(null);
  const energyEfficiencyChartContainerRef = useRef<HTMLDivElement>(null);
  const marketShareChartContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const chartContainers = [
      regionalTrendsChartContainerRef.current,
      popularityTrendsChartContainerRef.current,
      industryAdoptionChartContainerRef.current,
      energyEfficiencyChartContainerRef.current,
      marketShareChartContainerRef.current,
    ];

    return () => {
      chartContainers.forEach(container => {
        if (container) {
          // Child components are responsible for their own SVG cleanup.
          // This parent cleanup focuses on attributes it might have set (if any).
          container.removeAttribute('data-chart-initialized-s8-region-trends');
          container.removeAttribute('data-chart-initialized-s8-pop-trends');
          container.removeAttribute('data-chart-initialized-s8-industry');
          container.removeAttribute('data-chart-initialized-s8-energy');
          container.removeAttribute('data-chart-initialized-s8-donut');
        }
      });
    };
  }, []); // Empty dependency array as we only want this to run on mount/unmount for cleanup.

  return (
    <div className="trends-deep-dive-slide">
      <main className="slide-main-content-s8">
        <div className="charts-grid-s8">
          <div className="chart-cell-s8 top-left-s8">
            {/* <h3 className="chart-title-s8">Прогноз роста внедрения по регионам</h3> */}
            <div ref={regionalTrendsChartContainerRef} className="chart-container-s8">
              <RegionalTrendsAreaChart />
            </div>
          </div>
          <div className="chart-cell-s8 top-right-s8">
            {/* <h3 className="chart-title-s8">Тренды популярности бенчмарков</h3> */}
            <div ref={popularityTrendsChartContainerRef} className="chart-container-s8">
              <PopularityTrendsLineChart />
            </div>
          </div>
          <div className="chart-cell-s8 bottom-left-s8">
            {/* <h3 className="chart-title-s8">Энергоэффективность и стоимость транзакций СУБД (2023-2025)</h3> */}
            <div ref={energyEfficiencyChartContainerRef} className="chart-container-s8">
              <EnergyEfficiencyLineChart />
            </div>
          </div>
          <div className="chart-cell-s8 bottom-right-s8">
            {/* <h3 className="chart-title-s8">Внедрение бенчмаркинга по отраслям</h3> */}
            <div ref={industryAdoptionChartContainerRef} className="chart-container-s8">
              <IndustryAdoptionBarChart />
            </div>
          </div>
        </div>
      </main>
      <aside className="slide-sidebar-s8">
        <MetricCard title="Рыночная доля" variant="donuts" delay={0.1}>
          <div ref={marketShareChartContainerRef} className="sidebar-chart-container-s8 donut-chart-s8-container">
            <MarketShareDonutChart />
          </div>
        </MetricCard>
        <MetricCard title="Ключевые показатели" variant="metrics" delay={0.2}>
          <div className="key-metrics-grid-s8">
            {keyMetricsData.map((metric, index) => (
              <div key={index} className="metric-item-s8">
                <span className="metric-icon-s8">{metric.icon}</span>
                <span className="metric-value-s8">{metric.value}</span>
                <span className="metric-label-s8">{metric.label}</span>
              </div>
            ))}
          </div>
        </MetricCard>
        <MetricCard title="Ключевые выводы" variant="insights" delay={0.3}>
          <ul className="key-insights-list-s8">
            {keyInsightsData.map((insight, index) => (
              <li key={index}>
                <strong>{insight.number}</strong> {insight.text}
              </li>
            ))}
          </ul>
        </MetricCard>
      </aside>
    </div>
  );
}; 