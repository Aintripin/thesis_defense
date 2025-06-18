import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ScalabilityDelaysSlide.module.scss';
import { SlideHeading } from '../../components/SlideHeading';

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
  const chartRef = useRef<SVGSVGElement>(null);
  const { isPrintTheme } = useTheme();

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
  const marginLeft = 80;
  const marginRight = 50;
  const marginTop = 40;
  const marginBottom = 80;
  const plotWidth = chartWidth - marginLeft - marginRight;
  const plotHeight = chartHeight - marginTop - marginBottom;

  const maxValue = 50;
  const minThreads = 4;
  const maxThreads = 256;

  // D3 scales
  const xScale = d3.scaleLog()
    .domain([minThreads, maxThreads])
    .range([0, plotWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([plotHeight, 0]);

  // Line generator
  const line = d3.line<DataPoint>()
    .x(d => xScale(d.threads))
    .y(d => yScale(d.value))
    .curve(d3.curveMonotoneX);

  // D3 Chart rendering effect
  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();

    // Create main group with margins
    const g = svg.append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    // Grid lines
    const gridGroup = g.append("g").attr("class", styles.grid);
    
    // Horizontal grid lines
    gridGroup.selectAll(".horizontal-grid")
      .data([0, 10, 20, 30, 40, 50])
      .enter()
      .append("line")
      .attr("class", `horizontal-grid ${styles.gridLine}`)
      .attr("x1", 0)
      .attr("x2", plotWidth)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d));

    // Vertical grid lines
    gridGroup.selectAll(".vertical-grid")
      .data([4, 8, 16, 32, 64, 128, 256])
      .enter()
      .append("line")
      .attr("class", `vertical-grid ${styles.gridLine}`)
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", 0)
      .attr("y2", plotHeight);

    // Axes
    g.append("line")
      .attr("class", styles.axisLine)
      .attr("x1", 0)
      .attr("x2", plotWidth)
      .attr("y1", plotHeight)
      .attr("y2", plotHeight);

    g.append("line")
      .attr("class", styles.axisLine)
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", plotHeight);

    // Y-axis labels
    g.selectAll(".y-label")
      .data([0, 10, 20, 30, 40, 50])
      .enter()
      .append("text")
      .attr("class", `y-label ${styles.axisLabel}`)
      .attr("x", -15)
      .attr("y", d => yScale(d) + 4)
      .attr("text-anchor", "end")
      .text(d => d);

    // X-axis labels
    g.selectAll(".x-label")
      .data([4, 8, 16, 32, 64, 128, 256])
      .enter()
      .append("text")
      .attr("class", `x-label ${styles.axisLabel}`)
      .attr("x", d => xScale(d))
      .attr("y", plotHeight + 20)
      .attr("text-anchor", "middle")
      .text(d => d);

    // Axis titles
    g.append("text")
      .attr("class", styles.axisLabel)
      .attr("x", plotWidth / 2)
      .attr("y", plotHeight + 60)
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .text("Количество потоков");

    g.append("text")
      .attr("class", styles.axisLabel)
      .attr("transform", `rotate(-90)`)
      .attr("x", -plotHeight / 2)
      .attr("y", -55)
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .text("ops/sec (k)");

    // Draw lines and points for each database
    Object.entries(databases).forEach(([key, db]) => {
      const isActive = activeDBs.has(key);
      const opacity = isActive ? 1 : 0.2;

      // Line path
      const path = g.append("path")
        .datum(db.data)
        .attr("class", `${styles.dataLine} ${styles[key]}`)
        .attr("d", line)
        .style("opacity", opacity)
        .style("stroke", isPrintTheme ? "#000" : db.color)
        .style("stroke-width", isPrintTheme ? "3" : "4")
        .style("fill", "none")
        .style("stroke-linecap", "round")
        .style("stroke-linejoin", "round");

      // Apply print theme dash patterns or special rendering
      if (isPrintTheme) {
        switch (key) {
          case 'postgresql':
            path.style("stroke-dasharray", "none");
            break;
          case 'mongodb':
            // For MongoDB, draw two thin parallel lines instead of dashes
            path.remove(); // Remove the original path
            
            // Draw first thin line (offset up by 1px)
            g.append("path")
              .datum(db.data)
              .attr("class", `${styles.dataLine} ${styles[key]}`)
              .attr("d", line)
              .attr("transform", "translate(0, -1)")
              .style("opacity", opacity)
              .style("stroke", "#000")
              .style("stroke-width", "1.5")
              .style("fill", "none")
              .style("stroke-linecap", "round")
              .style("stroke-linejoin", "round");
            
            // Draw second thin line (offset down by 1px)
            g.append("path")
              .datum(db.data)
              .attr("class", `${styles.dataLine} ${styles[key]}`)
              .attr("d", line)
              .attr("transform", "translate(0, 1)")
              .style("opacity", opacity)
              .style("stroke", "#000")
              .style("stroke-width", "1.5")
              .style("fill", "none")
              .style("stroke-linecap", "round")
              .style("stroke-linejoin", "round");
            break;
          case 'cassandra':
            path.style("stroke-dasharray", "12,6");
            break;
        }
      }

      // Points
      g.selectAll(`.point-${key}`)
        .data(db.data)
        .enter()
        .append("circle")
        .attr("class", `${styles.dataPoint} ${styles[key]} point-${key}`)
        .attr("cx", d => xScale(d.threads))
        .attr("cy", d => yScale(d.value))
        .attr("r", 6)
        .style("opacity", opacity)
        .style("cursor", "pointer")
        .style("fill", isPrintTheme ? 
          (key === 'mongodb' ? "#fff" : "#000") : 
          db.color
        )
        .style("stroke", isPrintTheme ? "#000" : db.color)
        .style("stroke-width", isPrintTheme ? 
          (key === 'mongodb' ? "3" : "1") : 
          "1"
        )
        .on('mouseover', (event, d) => {
          if (!isActive) return;
          if (!chartRef.current) return;
          const rect = chartRef.current.getBoundingClientRect();
          setTooltip({
            visible: true,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top - 60, // Position above the cursor
            content: `${db.name}: ${d.threads} потоков - ${d.value}k ops/sec`
          });
        })
        .on('mouseout', () => {
          setTooltip({ ...tooltip, visible: false });
        });
    });

  }, [activeDBs, isPrintTheme, databases, xScale, yScale, line, plotWidth, plotHeight]);

  return (
    <div className={`${styles.scalabilityDelaysSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <SlideHeading size="small">МАСШТАБИРУЕМОСТЬ И ЗАДЕРЖКИ</SlideHeading>

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
              <span className={styles.toggleLabel}>{db.name}</span>
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
            <div className={styles.lineChart}>
              <svg 
                ref={chartRef}
                className={styles.chartSvg} 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                width="100%"
                height="100%"
              />
              
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

export { ScalabilityDelaysSlide }; 