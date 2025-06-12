import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ScalabilityDelaysSlide.module.scss';

interface DataPoint {
  threads: number;
  value: number;
}

interface DatabaseData {
  name: string;
  color: string;
  data: DataPoint[];
  peak: { value: number; threads: number };
}

const ScalabilityDelaysSlide: React.FC = () => {
  const [activeDBs, setActiveDBs] = useState<Set<string>>(new Set(['postgresql', 'mongodb', 'cassandra']));
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string }>({
    visible: false,
    x: 0,
    y: 0,
    content: ''
  });
  const chartRef = useRef<HTMLDivElement>(null);

  const databases: Record<string, DatabaseData> = {
    postgresql: {
      name: 'PostgreSQL',
      color: '#8b5cf6',
      data: [
        { threads: 4, value: 9.68 },
        { threads: 8, value: 14.2 },
        { threads: 16, value: 15.1 },
        { threads: 32, value: 14.7 },
        { threads: 64, value: 18.5 },
        { threads: 128, value: 32.8 },
        { threads: 256, value: 27.6 }
      ],
      peak: { value: 32.8, threads: 128 }
    },
    mongodb: {
      name: 'MongoDB',
      color: '#10b981',
      data: [
        { threads: 4, value: 9.72 },
        { threads: 8, value: 15.4 },
        { threads: 16, value: 23.0 },
        { threads: 32, value: 25.0 },
        { threads: 64, value: 27.0 },
        { threads: 128, value: 27.0 },
        { threads: 256, value: 25.1 }
      ],
      peak: { value: 27.0, threads: 64 }
    },
    cassandra: {
      name: 'Cassandra',
      color: '#f59e0b',
      data: [
        { threads: 4, value: 8.33 },
        { threads: 8, value: 13.3 },
        { threads: 16, value: 19.6 },
        { threads: 32, value: 23.2 },
        { threads: 64, value: 20.4 },
        { threads: 128, value: 18.4 },
        { threads: 256, value: 19.0 }
      ],
      peak: { value: 23.2, threads: 32 }
    }
  };

  const toggleDB = (dbName: string) => {
    const newActiveDBs = new Set(activeDBs);
    if (newActiveDBs.has(dbName)) {
      newActiveDBs.delete(dbName);
    } else {
      newActiveDBs.add(dbName);
    }
    setActiveDBs(newActiveDBs);
  };

  // Chart dimensions and scaling
  const chartWidth = 600;
  const chartHeight = 500;
  const marginLeft = 60;
  const marginRight = 50;
  const marginTop = 40;
  const marginBottom = 80;
  const plotWidth = chartWidth - marginLeft - marginRight;
  const plotHeight = chartHeight - marginTop - marginBottom;

  const maxValue = 50; // Y-axis max
  const minThreads = 4;
  const maxThreads = 256;

  // Scale functions
  const xScale = (threads: number) => {
    const logMin = Math.log(minThreads);
    const logMax = Math.log(maxThreads);
    const logValue = Math.log(threads);
    return marginLeft + (plotWidth * (logValue - logMin)) / (logMax - logMin);
  };

  const yScale = (value: number) => {
    return marginTop + plotHeight - (plotHeight * value) / maxValue;
  };

  // Generate path for line
  const generatePath = (data: DataPoint[]) => {
    return data.map((point, index) => {
      const x = xScale(point.threads);
      const y = yScale(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  const handlePointHover = (event: React.MouseEvent, db: string, point: DataPoint) => {
    if (!chartRef.current) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top - 60,
      content: `${databases[db].name}: ${point.threads} потоков - ${point.value}k ops/sec`
    });
  };

  const handlePointLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className={styles.scalabilityDelaysSlide}>
      {/* Header */}
      <div className={styles.slideHeader}>
        <h1 className={styles.slideTitle}>
          М А С Ш Т А Б И Р У Е М О С Т Ь&nbsp;&nbsp;И&nbsp;&nbsp;З А Д Е Р Ж К И
        </h1>
        <p className={styles.slideSubtitle}>Поведение при увеличении параллелизма</p>
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        
        {/* Chart Type Controls */}
        <div className={styles.controls}>
          {Object.entries(databases).map(([key, db], index) => (
            <motion.button
              key={key}
              className={`${styles.dbToggle} ${styles[key]} ${activeDBs.has(key) ? styles.active : ''}`}
              onClick={() => toggleDB(key)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.toggleIndicator}></div>
              <span>{db.name}</span>
            </motion.button>
          ))}
        </div>

        <div className={styles.chartContainer}>
          {/* Main Chart Area */}
          <div className={styles.mainChart}>
            <motion.div 
              className={styles.chartTitle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Пропускная способность vs Количество потоков
            </motion.div>
            <div className={styles.lineChart} ref={chartRef}>
              <svg className={styles.chartSvg} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                {/* Grid lines */}
                <g>
                  {/* Horizontal grid */}
                  {[0, 10, 20, 30, 40, 50].map(value => (
                    <line
                      key={`h-${value}`}
                      className={styles.gridLine}
                      x1={marginLeft}
                      y1={yScale(value)}
                      x2={chartWidth - marginRight}
                      y2={yScale(value)}
                    />
                  ))}
                  
                  {/* Vertical grid */}
                  {[4, 8, 16, 32, 64, 128, 256].map(threads => (
                    <line
                      key={`v-${threads}`}
                      className={styles.gridLine}
                      x1={xScale(threads)}
                      y1={marginTop}
                      x2={xScale(threads)}
                      y2={chartHeight - marginBottom}
                    />
                  ))}
                </g>

                {/* Axes */}
                <line
                  className={styles.axisLine}
                  x1={marginLeft}
                  y1={chartHeight - marginBottom}
                  x2={chartWidth - marginRight}
                  y2={chartHeight - marginBottom}
                />
                <line
                  className={styles.axisLine}
                  x1={marginLeft}
                  y1={marginTop}
                  x2={marginLeft}
                  y2={chartHeight - marginBottom}
                />

                {/* Y-axis labels */}
                {[0, 10, 20, 30, 40, 50].map(value => (
                  <text
                    key={`y-label-${value}`}
                    className={styles.axisLabel}
                    x={marginLeft - 15}
                    y={yScale(value) + 4}
                    textAnchor="end"
                  >
                    {value}
                  </text>
                ))}

                {/* X-axis labels */}
                {[4, 8, 16, 32, 64, 128, 256].map(threads => (
                  <text
                    key={`x-label-${threads}`}
                    className={styles.axisLabel}
                    x={xScale(threads)}
                    y={chartHeight - marginBottom + 20}
                    textAnchor="middle"
                  >
                    {threads}
                  </text>
                ))}

                {/* Axis titles */}
                <text
                  className={styles.axisLabel}
                  x={chartWidth / 2}
                  y={chartHeight - 20}
                  textAnchor="middle"
                  fontWeight="600"
                >
                  Количество потоков
                </text>
                <text
                  className={styles.axisLabel}
                  x={-15}
                  y={chartHeight / 2}
                  textAnchor="middle"
                  fontWeight="600"
                  transform={`rotate(-90, 15, ${chartHeight / 2})`}
                >
                  ops/sec (k)
                </text>

                {/* Data lines and points */}
                {Object.entries(databases).map(([key, db], index) => (
                  <g key={key} style={{ opacity: activeDBs.has(key) ? 1 : 0.2 }}>
                    {/* Line */}
                    <motion.path
                      className={`${styles.dataLine} ${styles[key]} ${!activeDBs.has(key) ? styles.hidden : ''}`}
                      d={generatePath(db.data)}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: activeDBs.has(key) ? 1 : 0, 
                        opacity: activeDBs.has(key) ? 1 : 0.2 
                      }}
                      transition={{ 
                        pathLength: { duration: 2.5, ease: "easeInOut", delay: index * 0.3 },
                        opacity: { duration: 0.5, delay: index * 0.3 }
                      }}
                    />
                    
                    {/* Points */}
                    {db.data.map((point, pointIndex) => (
                      <motion.circle
                        key={`${key}-point-${pointIndex}`}
                        className={`${styles.dataPoint} ${styles[key]}`}
                        cx={xScale(point.threads)}
                        cy={yScale(point.value)}
                        r="6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: activeDBs.has(key) ? 1 : 0, 
                          opacity: activeDBs.has(key) ? 1 : 0.2 
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.3 + 2 + pointIndex * 0.1,
                          ease: "easeOut"
                        }}
                        onMouseEnter={(e) => handlePointHover(e, key, point)}
                        onMouseLeave={handlePointLeave}
                      />
                    ))}
                  </g>
                ))}
              </svg>
              
              {/* Tooltip */}
              {tooltip.visible && (
                <motion.div
                  className={styles.tooltip}
                  style={{
                    left: tooltip.x,
                    top: tooltip.y
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  dangerouslySetInnerHTML={{ __html: tooltip.content }}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <motion.div 
              className={styles.summaryCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <div className={styles.cardTitle}>Пиковые значения</div>
              <div className={styles.scalabilityStats}>
                {Object.entries(databases).map(([key, db]) => (
                  <div key={key} className={styles.statRow}>
                    <div className={`${styles.statDb} ${styles[`${key}Color`]}`}>
                      {db.name}
                    </div>
                    <div className={styles.statPeak}>
                      {db.peak.value}k @ {db.peak.threads} потоков
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className={styles.summaryCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <div className={styles.cardTitle}>Характеристики масштабируемости</div>
              <ul className={styles.insights}>
                <li className={styles.insightItem}>
                  <span className={styles.highlight}>MongoDB:</span> плавный рост до 27.0k ops/sec при 64-128 потоках
                </li>
                <li className={styles.insightItem}>
                  <span className={styles.highlight}>Cassandra:</span> пик 23.2k ops/sec при 32 потоках, затем снижение
                </li>
                <li className={styles.insightItem}>
                  <span className={styles.highlight}>PostgreSQL:</span> нелинейное поведение с максимумом 32.8k ops/sec при 128 потоков
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className={styles.summaryCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            >
              <div className={styles.cardTitle}>Практическая значимость</div>
              <ul className={styles.insights}>
                <li className={styles.insightItem}>
                  Не существует <span className={styles.highlight}>универсального решения</span> для всех типов нагрузок
                </li>
                <li className={styles.insightItem}>
                  Выбор СУБД должен основываться на <span className={styles.highlight}>конкретных требованиях</span> приложения
                </li>
                <li className={styles.insightItem}>
                  Важность <span className={styles.highlight}>предварительного тестирования</span> на реальных данных
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScalabilityDelaysSlide; 