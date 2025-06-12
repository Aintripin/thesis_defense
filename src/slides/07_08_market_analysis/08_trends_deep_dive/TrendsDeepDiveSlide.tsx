import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import styles from './TrendsDeepDiveSlide.module.scss';
import { MarketShareDonutChart } from './components/MarketShareDonutChart';
import { RegionalTrendsAreaChart } from './components/RegionalTrendsAreaChart'; 
import { PopularityTrendsLineChart } from './components/PopularityTrendsLineChart';
import { EnergyEfficiencyLineChart } from './components/EnergyEfficiencyLineChart';
import { IndustryAdoptionBarChart } from './components/IndustryAdoptionBarChart';

// Data for Key Metrics Cards
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

export const TrendsDeepDiveSlide: React.FC = () => {
  return (
    <div className={styles.trendsDeepDiveSlide}>
      {/* Field Adoption (Industry Adoption) - Top Left - 7×6 area */}
      <motion.div
        className={styles.fieldAdoptionArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className={styles.chartContainerS8}>
          <IndustryAdoptionBarChart />
        </div>
      </motion.div>

      {/* Growth Forecast (Regional Trends) - Top Center - 6×6 area */}
      <motion.div
        className={styles.growthForecastArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={styles.chartContainerS8}>
          <RegionalTrendsAreaChart />
        </div>
      </motion.div>

      {/* Popularity Trends - Top Right - 6×6 area */}
      <motion.div
        className={styles.popularityTrendsArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className={styles.chartContainerS8}>
          <PopularityTrendsLineChart />
        </div>
      </motion.div>

      {/* Efficiency Transaction Cost (Energy Efficiency) - Middle Right - 6×6 area */}
      <motion.div
        className={styles.efficiencyTransactionCostArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className={styles.chartContainerS8}>
          <EnergyEfficiencyLineChart />
        </div>
      </motion.div>

      {/* Market Share - Middle Center - Expanded to 8×5 area */}
      <motion.div
        className={styles.marketShareArea}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className={styles.cardTitle}>Рыночная доля</div>
        <div className={styles.chartContainerS8}>
          <MarketShareDonutChart />
        </div>
      </motion.div>

      {/* Key Metrics 1 - Left Vertical - 1×6 area */}
      <motion.div
        className={styles.keyMetrics1Area}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className={styles.cardTitle}>Ключевые показатели</div>
        <div className={styles.keyMetricsGridS8}>
          {keyMetricsData.slice(0, 2).map((metric, index) => (
            <motion.div 
              key={index} 
              className={styles.metricItemS8}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.7 + index * 0.1,
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
                  delay: 0.9 + index * 0.1,
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
                  opacity: { duration: 0.4, delay: 1.1 + index * 0.1 },
                  x: { duration: 0.4, delay: 1.1 + index * 0.1 },
                  scale: { 
                    duration: 2, 
                    delay: 1.9 + index * 0.2,
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
                  delay: 1.2 + index * 0.1 
                }}
              >
                {metric.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics 2a - Bottom Left - NoSQL рост - 3×1 area */}
      <motion.div
        className={styles.keyMetrics2aArea}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <motion.div 
          className={styles.singleMetricS8}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.8,
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
              delay: 1.0,
              type: "spring",
              stiffness: 200
            }}
          >
            {keyMetricsData[2].icon}
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
              opacity: { duration: 0.4, delay: 1.2 },
              x: { duration: 0.4, delay: 1.2 },
              scale: { 
                duration: 2, 
                delay: 2.0,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }
            }}
          >
            {keyMetricsData[2].value}
          </motion.span>
          <motion.span 
            className={styles.metricLabelS8}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 1.3
            }}
          >
            {keyMetricsData[2].label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Key Metrics 2b - Bottom Center - Облачные - 3×1 area */}
      <motion.div
        className={styles.keyMetrics2bArea}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <motion.div 
          className={styles.singleMetricS8}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.85,
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
              delay: 1.05,
              type: "spring",
              stiffness: 200
            }}
          >
            {keyMetricsData[3].icon}
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
              opacity: { duration: 0.4, delay: 1.25 },
              x: { duration: 0.4, delay: 1.25 },
              scale: { 
                duration: 2, 
                delay: 2.1,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }
            }}
          >
            {keyMetricsData[3].value}
          </motion.span>
          <motion.span 
            className={styles.metricLabelS8}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 1.35
            }}
          >
            {keyMetricsData[3].label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Conclusion 2 (Key Findings) - Large Right Area - 6×6 area */}
      <motion.div
        className={styles.conclusion2Area}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div 
          className={styles.keyFindingsTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          КЛЮЧЕВЫЕ ВЫВОДЫ
        </motion.div>
        <ul className={styles.keyInsightsListS8}>
          {keyInsightsData.map((insight, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.2 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                x: 8,
                transition: { duration: 0.2 }
              }}
            >
              <strong>{insight.number}</strong> {insight.text}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}; 