import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import styles from './TrendsDeepDiveSlide.module.scss'; // SCSS import updated
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
    className={`${styles.glassCard} ${styles[variant]}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.cardTitle}>{title}</div>
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
    <div className={styles.trendsDeepDiveSlide}>
      <main className={styles.slideMainContentS8}>
        <div className={styles.chartsGridS8}>
          <div className={`${styles.chartCellS8} ${styles.topLeftS8}`}>
            {/* <h3 className={styles.chartTitleS8}>Прогноз роста внедрения по регионам</h3> */}
            <div ref={regionalTrendsChartContainerRef} className={styles.chartContainerS8}>
              <RegionalTrendsAreaChart />
            </div>
          </div>
          <div className={`${styles.chartCellS8} ${styles.topRightS8}`}>
            {/* <h3 className={styles.chartTitleS8}>Тренды популярности бенчмарков</h3> */}
            <div ref={popularityTrendsChartContainerRef} className={styles.chartContainerS8}>
              <PopularityTrendsLineChart />
            </div>
          </div>
          <div className={`${styles.chartCellS8} ${styles.bottomLeftS8}`}>
            {/* <h3 className={styles.chartTitleS8}>Энергоэффективность и стоимость транзакций СУБД (2023-2025)</h3> */}
            <div ref={energyEfficiencyChartContainerRef} className={styles.chartContainerS8}>
              <EnergyEfficiencyLineChart />
            </div>
          </div>
          <div className={`${styles.chartCellS8} ${styles.bottomRightS8}`}>
            {/* <h3 className={styles.chartTitleS8}>Внедрение бенчмаркинга по отраслям</h3> */}
            <div ref={industryAdoptionChartContainerRef} className={styles.chartContainerS8}>
              <IndustryAdoptionBarChart />
            </div>
          </div>
        </div>
      </main>
      <aside className={styles.slideSidebarS8}>
        <MetricCard title="Рыночная доля" variant="donuts" delay={0.1}>
          <div ref={marketShareChartContainerRef} className={`${styles.sidebarChartContainerS8} ${styles.donutChartS8Container}`}>
            <MarketShareDonutChart />
          </div>
        </MetricCard>
        <MetricCard title="Ключевые показатели" variant="metrics" delay={0.2}>
          <div className={styles.keyMetricsGridS8}>
            {keyMetricsData.map((metric, index) => (
              <motion.div 
                key={index} 
                className={styles.metricItemS8}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className={styles.metricIconS8}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {metric.icon}
                </motion.span>
                <motion.span 
                  className={styles.metricValueS8}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    opacity: { duration: 0.4, delay: 0.7 + index * 0.1 },
                    x: { duration: 0.4, delay: 0.7 + index * 0.1 },
                    scale: { 
                      duration: 2, 
                      delay: 1.5 + index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {metric.value}
                </motion.span>
                <motion.span 
                  className={styles.metricLabelS8}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.8 + index * 0.1 
                  }}
                >
                  {metric.label}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </MetricCard>
        <MetricCard title="Ключевые выводы" variant="insights" delay={0.3}>
          <ul className={styles.keyInsightsListS8}>
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