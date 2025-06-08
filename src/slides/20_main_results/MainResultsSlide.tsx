import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MainResultsSlide.module.scss';

interface WorkloadData {
  workload: string;
  postgresql: number;
  mongodb: number;
  cassandra: number;
}

interface PerformanceLeader {
  workloads: string;
  leader: string;
}

const MainResultsSlide: React.FC = () => {
  const [chartType, setChartType] = useState<'bars' | 'radar'>('bars');

  const workloadData: WorkloadData[] = [
    { workload: 'A', postgresql: 8.06, mongodb: 11.2, cassandra: 24.2 },
    { workload: 'B', postgresql: 14.3, mongodb: 16.5, cassandra: 27.0 },
    { workload: 'C', postgresql: 18.5, mongodb: 19.1, cassandra: 29.2 },
    { workload: 'D', postgresql: 55.8, mongodb: 47.7, cassandra: 7.67 },
    { workload: 'E', postgresql: 9.62, mongodb: 23.9, cassandra: 1.81 },
    { workload: 'F', postgresql: 7.4, mongodb: 12.1, cassandra: 14.9 }
  ];

  const performanceLeaders: PerformanceLeader[] = [
    { workloads: 'A, B, C', leader: 'Cassandra' },
    { workloads: 'D', leader: 'PostgreSQL' },
    { workloads: 'E', leader: 'MongoDB' },
    { workloads: 'F', leader: 'Cassandra' }
  ];

  const keyInsights = [
    { text: 'Cassandra лидирует в стандартных CRUD-операциях (A, B, C)', highlight: 'Cassandra' },
    { text: 'PostgreSQL доминирует в Workload D (чтение последних записей)', highlight: 'PostgreSQL' },
    { text: 'MongoDB эффективен для операций сканирования (Workload E)', highlight: 'MongoDB' },
    { text: 'Максимальная разница в производительности достигает 30x', highlight: '30x' }
  ];

  // Calculate bar heights (max value for scaling)
  const maxValue = Math.max(...workloadData.flatMap(d => [d.postgresql, d.mongodb, d.cassandra]));
  const getBarHeight = (value: number) => (value / maxValue) * 840;

  // Radar chart points calculation
  const getRadarPoints = (data: number[], maxVal: number) => {
    const centerX = 200, centerY = 200; // Updated for 400x400 viewBox
    const angles = [0, 60, 120, 180, 240, 300]; // degrees for 6 workloads
    
    return data.map((value, index) => {
      const angle = (angles[index] - 90) * (Math.PI / 180); // Convert to radians, -90 to start at top
      const radius = (value / maxVal) * 130; // Increased max radius from 60 to 130
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const postgresqlData = workloadData.map(d => d.postgresql);
  const mongodbData = workloadData.map(d => d.mongodb);
  const cassandraData = workloadData.map(d => d.cassandra);

  return (
    <div className={styles.mainResultsSlide}>
      {/* Header */}
      <div className={styles.slideHeader}>
        <h1 className={styles.slideTitle}>
          О С Н О В Н Ы Е&nbsp;&nbsp;Р Е З У Л Ь Т А Т Ы&nbsp;&nbsp;И С С Л Е Д О В А Н И Я
        </h1>
        <p className={styles.slideSubtitle}>Сравнительный анализ производительности</p>
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        
        {/* Chart Type Controls */}
        <div className={styles.controls}>
          <button 
            className={`${styles.controlBtn} ${chartType === 'bars' ? styles.active : ''}`}
            onClick={() => setChartType('bars')}
          >
            Столбчатая диаграмма
          </button>
          <button 
            className={`${styles.controlBtn} ${chartType === 'radar' ? styles.active : ''}`}
            onClick={() => setChartType('radar')}
          >
            Радарные диаграммы
          </button>
        </div>

        <div className={styles.chartContainer}>
          {/* Main Chart Area */}
          <div className={styles.mainChart}>
            
            {/* Bar Chart */}
            {chartType === 'bars' && (
              <motion.div 
                className={styles.barsChart}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {workloadData.map((data, index) => (
                  <div key={data.workload} className={styles.workloadGroup}>
                    <div className={styles.workloadBars}>
                      <motion.div
                        className={`${styles.bar} ${styles.barPostgresql}`}
                        style={{ height: `${getBarHeight(data.postgresql)}px` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${getBarHeight(data.postgresql)}px` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <div className={styles.barValue}>{data.postgresql}k</div>
                      </motion.div>
                      <motion.div
                        className={`${styles.bar} ${styles.barMongodb}`}
                        style={{ height: `${getBarHeight(data.mongodb)}px` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${getBarHeight(data.mongodb)}px` }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.1, ease: "easeOut" }}
                      >
                        <div className={styles.barValue}>{data.mongodb}k</div>
                      </motion.div>
                      <motion.div
                        className={`${styles.bar} ${styles.barCassandra}`}
                        style={{ height: `${getBarHeight(data.cassandra)}px` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${getBarHeight(data.cassandra)}px` }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                      >
                        <div className={styles.barValue}>{data.cassandra}k</div>
                      </motion.div>
                    </div>
                    <div className={styles.workloadLabel}>Workload {data.workload}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Radar Charts */}
            {chartType === 'radar' && (
              <motion.div 
                className={styles.radarContainer}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.radarChart}>
                  <div className={styles.radarTitle}>PostgreSQL</div>
                  <svg width="400" height="400" viewBox="0 0 400 400">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Grid */}
                    <g stroke="#e2e8f0" strokeWidth="2" fill="none">
                      <polygon points="200,50 344,125 344,275 200,350 56,275 56,125" opacity="0.3" />
                      <polygon points="200,83 311,150 311,250 200,317 89,250 89,150" opacity="0.3" />
                      <polygon points="200,117 278,175 278,225 200,283 122,225 122,175" opacity="0.3" />
                    </g>
                    {/* Data */}
                    <polygon
                      points={getRadarPoints(postgresqlData, maxValue)}
                      fill="rgba(139, 92, 246, 0.3)"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      filter="url(#glow)"
                    />
                    {/* Labels */}
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((label, index) => {
                      const angles = [0, 60, 120, 180, 240, 300];
                      const angle = (angles[index] - 90) * (Math.PI / 180);
                      const x = 200 + 170 * Math.cos(angle);
                      const y = 200 + 170 * Math.sin(angle);
                      return (
                        <text key={label} x={x} y={y} textAnchor="middle" fontSize="16" fill="#64748b" fontWeight="600">
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                <div className={styles.radarChart}>
                  <div className={styles.radarTitle}>MongoDB</div>
                  <svg width="400" height="400" viewBox="0 0 400 400">
                    {/* Grid */}
                    <g stroke="#e2e8f0" strokeWidth="2" fill="none">
                      <polygon points="200,50 344,125 344,275 200,350 56,275 56,125" opacity="0.3" />
                      <polygon points="200,83 311,150 311,250 200,317 89,250 89,150" opacity="0.3" />
                      <polygon points="200,117 278,175 278,225 200,283 122,225 122,175" opacity="0.3" />
                    </g>
                    {/* Data */}
                    <polygon
                      points={getRadarPoints(mongodbData, maxValue)}
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="3"
                      filter="url(#glow)"
                    />
                    {/* Labels */}
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((label, index) => {
                      const angles = [0, 60, 120, 180, 240, 300];
                      const angle = (angles[index] - 90) * (Math.PI / 180);
                      const x = 200 + 170 * Math.cos(angle);
                      const y = 200 + 170 * Math.sin(angle);
                      return (
                        <text key={label} x={x} y={y} textAnchor="middle" fontSize="16" fill="#64748b" fontWeight="600">
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                <div className={styles.radarChart}>
                  <div className={styles.radarTitle}>Cassandra</div>
                  <svg width="400" height="400" viewBox="0 0 400 400">
                    {/* Grid */}
                    <g stroke="#e2e8f0" strokeWidth="2" fill="none">
                      <polygon points="200,50 344,125 344,275 200,350 56,275 56,125" opacity="0.3" />
                      <polygon points="200,83 311,150 311,250 200,317 89,250 89,150" opacity="0.3" />
                      <polygon points="200,117 278,175 278,225 200,283 122,225 122,175" opacity="0.3" />
                    </g>
                    {/* Data */}
                    <polygon
                      points={getRadarPoints(cassandraData, maxValue)}
                      fill="rgba(245, 158, 11, 0.3)"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      filter="url(#glow)"
                    />
                    {/* Labels */}
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((label, index) => {
                      const angles = [0, 60, 120, 180, 240, 300];
                      const angle = (angles[index] - 90) * (Math.PI / 180);
                      const x = 200 + 170 * Math.cos(angle);
                      const y = 200 + 170 * Math.sin(angle);
                      return (
                        <text key={label} x={x} y={y} textAnchor="middle" fontSize="16" fill="#64748b" fontWeight="600">
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Legend */}
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.postgresqlGradient}`}></div>
                <span className={styles.legendLabel}>PostgreSQL</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.mongodbGradient}`}></div>
                <span className={styles.legendLabel}>MongoDB</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.cassandraGradient}`}></div>
                <span className={styles.legendLabel}>Cassandra</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={`${styles.summaryCard} ${styles.leadersCard}`}>
              <div className={styles.cardTitle}>Лидеры по workload'ам</div>
              <div className={styles.performanceStats}>
                {performanceLeaders.map((leader, index) => (
                  <div key={index} className={styles.statCard}>
                    <div className={styles.statLabel}>{leader.workloads}</div>
                    <div className={styles.statValue}>{leader.leader}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.summaryCard} ${styles.insightsCard}`}>
              <div className={styles.cardTitle}>Ключевые выводы</div>
              <ul className={styles.insights}>
                {keyInsights.map((insight, index) => (
                  <li key={index} className={styles.insightItem}>
                    <span dangerouslySetInnerHTML={{
                      __html: insight.text.replace(
                        insight.highlight, 
                        `<span class="highlight">${insight.highlight}</span>`
                      )
                    }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainResultsSlide; 