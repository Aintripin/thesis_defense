import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
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

interface MainResultsSlideProps {
  initialChartType?: 'bars' | 'radar';
}

const MainResultsSlide: React.FC<MainResultsSlideProps> = ({ initialChartType = 'bars' }) => {
  const [chartType, setChartType] = useState<'bars' | 'radar'>(initialChartType);
  const navigate = useNavigate();
  const location = useLocation();
  const { isPrintTheme } = useTheme();

  // Update navigation when chart type changes
  useEffect(() => {
    if (chartType === 'bars' && location.pathname !== '/main-results') {
      navigate('/main-results', { replace: true });
    } else if (chartType === 'radar' && location.pathname !== '/main-results/radar') {
      navigate('/main-results/radar', { replace: true });
    }
  }, [chartType, navigate, location.pathname]);

  const slideTitle = chartType === 'bars'
    ? 'О С Н О В Н Ы Е\u00a0\u00a0Р Е З У Л Ь Т А Т Ы'
    : 'Д Е Т А Л И З А Ц И Я\u00a0\u00a0П Р О И З В О Д И Т Е Л Ь Н О С Т И';

  // Apply print theme overrides to SVG elements
  useEffect(() => {
    if (isPrintTheme && chartType === 'radar') {
      const applyPrintStyles = () => {
        // Find all SVG elements in radar charts with more specific selector
        const radarContainer = document.querySelector('[class*="radarContainer"]');
        if (!radarContainer) {
          console.log('Radar container not found');
          return;
        }
        
        const svgElements = radarContainer.querySelectorAll('svg');
        console.log('Found SVG elements:', svgElements.length);
        
        svgElements.forEach((svg, index) => {
          console.log(`Processing SVG ${index}`);
          
          // Remove existing glow filters
          const filters = svg.querySelectorAll('filter');
          filters.forEach(filter => filter.remove());

          // Create pattern definitions for fills
          let defs = svg.querySelector('defs');
          if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.insertBefore(defs, svg.firstChild);
          }
          
          // Clear existing patterns
          const existingPatterns = defs.querySelectorAll('pattern');
          existingPatterns.forEach(pattern => pattern.remove());

          // Create different fill patterns based on database
          let patternId = '';
          if (index === 0) { // PostgreSQL - solid black
            const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            patternId = 'postgresql-solid';
            pattern.setAttribute('id', patternId);
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');
            pattern.setAttribute('width', '1');
            pattern.setAttribute('height', '1');
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', '1');
            rect.setAttribute('height', '1');
            rect.setAttribute('fill', '#000');
            pattern.appendChild(rect);
            defs.appendChild(pattern);
          } else if (index === 1) { // MongoDB - diagonal stripes
            const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            patternId = 'mongodb-diagonal';
            pattern.setAttribute('id', patternId);
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');
            pattern.setAttribute('width', '10');
            pattern.setAttribute('height', '10');
            // White background
            const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bgRect.setAttribute('width', '10');
            bgRect.setAttribute('height', '10');
            bgRect.setAttribute('fill', 'white');
            pattern.appendChild(bgRect);
            // Diagonal lines
            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute('x1', '0');
            line1.setAttribute('y1', '0');
            line1.setAttribute('x2', '10');
            line1.setAttribute('y2', '10');
            line1.setAttribute('stroke', '#000');
            line1.setAttribute('stroke-width', '2');
            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute('x1', '-2');
            line2.setAttribute('y1', '8');
            line2.setAttribute('x2', '2');
            line2.setAttribute('y2', '12');
            line2.setAttribute('stroke', '#000');
            line2.setAttribute('stroke-width', '2');
            const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line3.setAttribute('x1', '8');
            line3.setAttribute('y1', '-2');
            line3.setAttribute('x2', '12');
            line3.setAttribute('y2', '2');
            line3.setAttribute('stroke', '#000');
            line3.setAttribute('stroke-width', '2');
            pattern.appendChild(line1);
            pattern.appendChild(line2);
            pattern.appendChild(line3);
            defs.appendChild(pattern);
          } else if (index === 2) { // Cassandra - horizontal stripes
            const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            patternId = 'cassandra-horizontal';
            pattern.setAttribute('id', patternId);
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');
            pattern.setAttribute('width', '10');
            pattern.setAttribute('height', '8');
            // White background
            const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bgRect.setAttribute('width', '10');
            bgRect.setAttribute('height', '8');
            bgRect.setAttribute('fill', 'white');
            pattern.appendChild(bgRect);
            // Horizontal stripes
            const stripe1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            stripe1.setAttribute('width', '10');
            stripe1.setAttribute('height', '2');
            stripe1.setAttribute('y', '0');
            stripe1.setAttribute('fill', '#000');
            const stripe2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            stripe2.setAttribute('width', '10');
            stripe2.setAttribute('height', '2');
            stripe2.setAttribute('y', '4');
            stripe2.setAttribute('fill', '#000');
            pattern.appendChild(stripe1);
            pattern.appendChild(stripe2);
            defs.appendChild(pattern);
          }

          // Style grid lines
          const gridGroups = svg.querySelectorAll('g[stroke="#94a3b8"]');
          gridGroups.forEach(group => {
            group.setAttribute('stroke', '#000');
            const polygons = group.querySelectorAll('polygon');
            polygons.forEach(polygon => {
              polygon.setAttribute('stroke', '#000');
              polygon.setAttribute('fill', 'none');
            });
          });

          // Find and style data polygons - try multiple selectors
          let dataPolygons: NodeListOf<SVGPolygonElement> | SVGPolygonElement[] = svg.querySelectorAll('polygon[fill*="rgba"]');
          if (dataPolygons.length === 0) {
            // Try alternative selectors
            dataPolygons = svg.querySelectorAll('polygon[stroke="#8b5cf6"], polygon[stroke="#10b981"], polygon[stroke="#f59e0b"]');
          }
          if (dataPolygons.length === 0) {
            // Try finding all polygons that are not grid polygons
            const allPolygons = Array.from(svg.querySelectorAll('polygon'));
            const gridPolygons = Array.from(svg.querySelectorAll('g[stroke="#94a3b8"] polygon, g[stroke="#000"] polygon'));
            dataPolygons = allPolygons.filter(p => !gridPolygons.includes(p));
          }
          
          // If still no data polygons found, just take all polygons except the first 3 (which are usually grid)
          if (dataPolygons.length === 0) {
            const allPolygons = Array.from(svg.querySelectorAll('polygon'));
            if (allPolygons.length > 3) {
              dataPolygons = [allPolygons[allPolygons.length - 1]]; // Take the last polygon (usually the data)
            }
          }
          
          console.log(`Found ${dataPolygons.length} data polygons in SVG ${index}`);
          
          Array.from(dataPolygons).forEach((polygon, polyIndex) => {
            console.log(`Applying pattern ${patternId} to polygon ${polyIndex}`, polygon);
            polygon.setAttribute('fill', `url(#${patternId})`);
            polygon.setAttribute('stroke', '#000');
            polygon.setAttribute('stroke-width', '2');
            polygon.removeAttribute('filter');
            
            // Force style update
            polygon.style.fill = `url(#${patternId})`;
            polygon.style.stroke = '#000';
            polygon.style.strokeWidth = '2';
          });

          // Style text labels
          const textElements = svg.querySelectorAll('text');
          textElements.forEach(text => {
            text.setAttribute('fill', '#000');
          });
        });
      };

      // Apply styles with multiple attempts
      applyPrintStyles();
      const timeoutId1 = setTimeout(applyPrintStyles, 100);
      const timeoutId2 = setTimeout(applyPrintStyles, 500);
      
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [isPrintTheme, chartType]);

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
  const getBarHeight = (value: number) => (value / maxValue) * 750;

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
    <div className={`${styles.mainResultsSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <motion.div
        className={styles.slideHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>
          {slideTitle}
        </h1>
      </motion.div>

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

        <div className={styles.chartContainer} style={{ 
          display: 'flex !important', 
          gap: '40px !important', 
          flex: '1 !important',
          width: '100%',
          height: '100%'
        }}>
          {/* Main Chart Area */}
          <motion.div 
            className={styles.mainChart} 
            animate={{
              flex: chartType === 'radar' ? 100 : 70,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              flex: chartType === 'radar' ? 100 : 70,
              minWidth: 0,
              width: 'auto',
              maxWidth: 'none'
            }}
          >
            
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
                  <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto' }}>
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
                    <g stroke="#94a3b8" strokeWidth="3" fill="none">
                      <polygon points="200,50 344,125 344,275 200,350 56,275 56,125" opacity="0.6" />
                      <polygon points="200,83 311,150 311,250 200,317 89,250 89,150" opacity="0.6" />
                      <polygon points="200,117 278,175 278,225 200,283 122,225 122,175" opacity="0.6" />
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
                        <text key={label} x={x} y={y} textAnchor="middle" fontSize="28" fill="#1e293b" fontWeight="700">
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                <div className={styles.radarChart}>
                  <div className={styles.radarTitle}>MongoDB</div>
                  <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto' }}>
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
                    <g stroke="#94a3b8" strokeWidth="3" fill="none">
                      <polygon points="200,50 344,125 344,275 200,350 56,275 56,125" opacity="0.6" />
                      <polygon points="200,83 311,150 311,250 200,317 89,250 89,150" opacity="0.6" />
                      <polygon points="200,117 278,175 278,225 200,283 122,225 122,175" opacity="0.6" />
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
                        <text key={label} x={x} y={y} textAnchor="middle" fontSize="28" fill="#1e293b" fontWeight="700">
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                <div className={styles.radarChart}>
                  <div className={styles.radarTitle}>Cassandra</div>
                  <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto' }}>
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
                    <g stroke="#94a3b8" strokeWidth="3" fill="none">
                      <polygon points="200,50 344,125 344,275 200,350 56,275 56,125" opacity="0.6" />
                      <polygon points="200,83 311,150 311,250 200,317 89,250 89,150" opacity="0.6" />
                      <polygon points="200,117 278,175 278,225 200,283 122,225 122,175" opacity="0.6" />
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
                        <text key={label} x={x} y={y} textAnchor="middle" fontSize="28" fill="#1e293b" fontWeight="700">
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
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className={styles.sidebar} 
            animate={{
              x: chartType === 'radar' ? '100%' : '0%',
              opacity: chartType === 'radar' ? 0 : 1,
              flex: chartType === 'radar' ? 0 : 30,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              flex: chartType === 'radar' ? 0 : 30,
              minWidth: chartType === 'radar' ? '0px' : '200px', 
              maxWidth: chartType === 'radar' ? '0px' : '250px',
              width: chartType === 'radar' ? '0px' : '200px',
              display: 'flex', 
              flexDirection: 'column',
              gap: '25px',
              flexShrink: 0,
              overflow: 'hidden'
            }}
          >
            <div className={`${styles.summaryCard} ${styles.leadersCard}`}>
              <div className={styles.cardTitle}>Лидеры по workloads</div>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainResultsSlide; 