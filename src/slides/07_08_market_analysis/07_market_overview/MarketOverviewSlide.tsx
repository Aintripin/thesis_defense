import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { useTheme } from '../../../contexts/ThemeContext'
import styles from './MarketOverviewSlide.module.scss' // CSS Modules import

interface MetricCardProps {
  title: string
  children: React.ReactNode
  delay?: number
  variant: 'metrics' | 'trends' | 'insights'
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
)

export const MarketOverviewSlide: React.FC = () => { // Component name updated
  const { isPrintTheme } = useTheme()
  const chartRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const animationTimeoutId = useRef<number | null>(null)
  const nextDotIndexRef = useRef<number>(0)

  useEffect(() => {
    if (!chartRef.current) {
      console.log("[MarketOverviewSlide] chartRef.current is null, returning.");
      return;
    }

    const container = chartRef.current;
    // Clear previous SVG to prevent duplicates on re-render
    d3.select(container).selectAll("*").remove();
    console.log(`[MarketOverviewSlide] Initializing chart for theme: ${isPrintTheme ? 'print' : 'color'}`);

    nextDotIndexRef.current = 0;

    const data = [
      { year: 2023, relational: 70.76, nosql: 7.55, graph: 2.9, cloud: 12.64, total: 100.79 },
      { year: 2024, relational: 79.61, nosql: 9.82, graph: 3.5, cloud: 16.08, total: 129.01 },
      { year: 2025, relational: 89.57, nosql: 12.77, graph: 4.2, cloud: 20.44, total: 150.38 },
      { year: 2026, relational: 100.75, nosql: 16.6, graph: 5.0, cloud: 26.02, total: 173.37 },
      { year: 2027, relational: 113.34, nosql: 21.58, graph: 6.0, cloud: 33.09, total: 199.01 },
      { year: 2028, relational: 127.51, nosql: 28.05, graph: 7.2, cloud: 42.09, total: 229.85 },
      { year: 2029, relational: 143.45, nosql: 36.47, graph: 8.6, cloud: 53.49, total: 267.01 },
      { year: 2030, relational: 161.38, nosql: 47.41, graph: 10.9, cloud: 68.03, total: 292.22 }
    ];
    const categories = [
      { key: "relational", name: "Реляционные СУБД", color: "#1E3A8A", pattern: "horizontal-lines" },
      { key: "nosql", name: "NoSQL СУБД", color: "#3B82F6", pattern: "diagonal-lines" },
      { key: "cloud", name: "Облачные СУБД", color: "#60A5FA", pattern: "vertical-lines" },
      { key: "graph", name: "Графовые СУБД", color: "#93C5FD", pattern: "checkerboard" }
    ];

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const margin = { top: 20, right: 30, bottom: 80, left: 90 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    if (width <= 0 || height <= 0) return;

    const svg = d3.select(container).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    const defs = svg.append("defs");
    
    if (isPrintTheme) {
      categories.forEach(category => {
        const pattern = defs.append("pattern")
          .attr("id", `pattern-${category.key}`)
          .attr("patternUnits", "userSpaceOnUse");
        
        switch (category.pattern) {
          case "horizontal-lines":
            pattern.attr("width", 8).attr("height", 8);
            pattern.append("rect").attr("width", 8).attr("height", 8).attr("fill", "#222"); // Dark fill
            pattern.append("path") // Spaced out white lines
              .attr("d", "M 0,2 L 8,2 M 0,6 L 8,6")
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 1);
            break;
          case "diagonal-lines":
            pattern.attr("width", 10).attr("height", 10); // Larger pattern area
            pattern.append("rect").attr("width", 10).attr("height", 10).attr("fill", "white");
            pattern.append("path") // Fewer lines for more space
              .attr("d", "M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4")
              .attr("stroke", "#000000")
              .attr("stroke-width", 1.2);
            break;
          case "vertical-lines":
            pattern.attr("width", 12).attr("height", 12); // Larger pattern area
            pattern.append("rect").attr("width", 12).attr("height", 12).attr("fill", "white");
            pattern.append("path") // Spaced out lines
              .attr("d", "M 3,0 L 3,12 M 9,0 L 9,12")
              .attr("stroke", "#000000")
              .attr("stroke-width", 1.5);
            break;
          case "checkerboard":
            pattern.attr("width", 12).attr("height", 12); // Larger pattern area for bigger squares
            pattern.append("rect").attr("width", 12).attr("height", 12).attr("fill", "white");
            pattern.append("rect").attr("x", 0).attr("y", 0).attr("width", 6).attr("height", 6).attr("fill", "#666");
            pattern.append("rect").attr("x", 6).attr("y", 6).attr("width", 6).attr("height", 6).attr("fill", "#666");
            break;
        }
      });
    } else {
      categories.forEach(category => {
        const gradient = defs.append("linearGradient").attr("id", `gradient-${category.key}`).attr("gradientUnits", "userSpaceOnUse").attr("x1", 0).attr("y1", height).attr("x2", 0).attr("y2", 0);
        gradient.append("stop").attr("offset", "0%").attr("stop-color", category.color).attr("stop-opacity", 0.3);
        gradient.append("stop").attr("offset", "100%").attr("stop-color", category.color).attr("stop-opacity", 0.8);
      });
    }

    const lineSegmentsLayer = g.append("g").attr("class", "line-segments-layer");
    const dotsLayer = g.append("g").attr("class", "dots-layer");

    const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.year) as [number, number]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total)! * 1.1]).range([height, 0]);

    g.append("g").attr("class", "grid").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale).tickSize(-height).tickFormat("" as any));
    g.append("g").attr("class", "grid").call(d3.axisLeft(yScale).tickSize(-width).tickFormat("" as any));

    const stack = d3.stack<any>().keys(categories.map(d => d.key)).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
    const stackedData = stack(data);
    const areaGenerator = d3.area<any>().x(d => xScale(d.data.year)).y0(d => yScale(d[0])).y1(d => yScale(d[1])).curve(d3.curveCardinal);

    const areas = g.selectAll(".area").data(stackedData).enter().append("path").attr("class", "area")
      .style("fill", (d, i) => isPrintTheme ? `url(#pattern-${categories[i].key})` : `url(#gradient-${categories[i].key})`)
      .style("stroke", (d, i) => isPrintTheme ? "#000000" : categories[i].color)
      .style("stroke-width", isPrintTheme ? 1 : 1.5);

    if (!isPrintTheme) {
      // Only animate in color theme
      areas.each(function(areaData, i) {
        const path = d3.select(this); const originalPath = areaGenerator(areaData as any);
        const startArea = d3.area<any>().x(d => xScale(d.data.year)).y0(_ => yScale(0)).y1(_ => yScale(0)).curve(d3.curveCardinal);
        path.attr("d", startArea(areaData as any));
        let progress = 0, currentAmplitude = 8, currentPhase = 0;
        const frequency = 0.015, areaTotalDuration = 2000, areaStartTime = Date.now() + (i * 400);
        
        function animateRise() {
          const now = Date.now(); 
          if (now < areaStartTime) { animationFrameId.current = requestAnimationFrame(animateRise); return; }
          const elapsed = now - areaStartTime; progress = Math.min(elapsed / areaTotalDuration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          currentAmplitude = 8 * (1 - progress * 0.7); currentPhase += 0.2;
          const risingArea = d3.area<any>().x(d => xScale(d.data.year)).y0(d => yScale(0) + (yScale(d[0]) - yScale(0)) * easeProgress).y1(d => { const finalY = yScale(d[1]); const currentY = yScale(0) + (finalY - yScale(0)) * easeProgress; const wave = currentAmplitude * Math.sin(frequency * xScale(d.data.year) + currentPhase); return currentY + wave; }).curve(d3.curveCardinal);
          path.attr("d", risingArea(areaData as any));
          if (progress < 1) { animationFrameId.current = requestAnimationFrame(animateRise); } else {
            let settleAmplitude = 5, oscillationTime = 0; const maxOscillationTime = 3000;
            const settle = () => {
              oscillationTime += 50; const dampingFactor = Math.max(0.1, 1 - (oscillationTime / maxOscillationTime)); settleAmplitude = 5 * dampingFactor; currentPhase += 0.15;
              if (oscillationTime < maxOscillationTime) { const settleArea = d3.area<any>().x(d => xScale(d.data.year)).y0(d => yScale(d[0])).y1(d => yScale(d[1]) + settleAmplitude * Math.sin(frequency * xScale(d.data.year) + currentPhase)).curve(d3.curveCardinal); path.attr("d", settleArea(areaData as any)); setTimeout(settle, 50); } else { path.transition().duration(500).attr("d", originalPath); }
            }; setTimeout(settle, 200);
          }
        }
        animationFrameId.current = requestAnimationFrame(animateRise);
      });
    } else {
      // For print theme, just draw the final state without animation
      areas.attr("d", areaGenerator as any);
    }

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale).tickFormat(d3.format("d"))).selectAll("text").style("fill", isPrintTheme ? "#000000" : "#475569").style("font-size", "16px").style("font-weight", "500");
    g.append("g").call(d3.axisLeft(yScale)).selectAll("text").style("fill", isPrintTheme ? "#000000" : "#475569").style("font-size", "16px").style("font-weight", "500");
    g.selectAll(".domain").style("stroke", isPrintTheme ? "#000000" : "#64748B"); 
    g.selectAll(".tick line").style("stroke", isPrintTheme ? "#000000" : "#64748B");
    g.append("text").attr("x", width / 2).attr("y", height + 65).attr("fill", isPrintTheme ? "#000000" : "#475569").style("text-anchor", "middle").style("font-size", "22px").style("font-weight", "bold").style("font-family", "'ALS Sector Regular', sans-serif").text("Год");
    g.append("text").attr("transform", "rotate(-90)").attr("y", -65).attr("x", -height / 2).attr("fill", isPrintTheme ? "#000000" : "#475569").style("text-anchor", "middle").style("font-size", "22px").style("font-weight", "bold").style("font-family", "'ALS Sector Regular', sans-serif").text("Объём рынка (млрд USD)");

    const line = d3.line<any>().x(d => xScale(d.year)).y(d => yScale(d.total)).curve(d3.curveCardinal);
    
    if (!isPrintTheme) {
      // Animated dashed line for color theme
      const totalLinePath = g.append("path").datum(data).attr("d", line).style("fill", "none").style("stroke", "#1E293B").style("stroke-width", 3).style("visibility", "hidden");

      animationTimeoutId.current = window.setTimeout(() => {
        console.log("[MarketOverviewSlide] Starting line and dot animation after 4s delay...");
        const pathNode = totalLinePath.node() as SVGPathElement;
        if (!pathNode) { console.error("[MarketOverviewSlide] totalLinePath.node() is null!"); return; }
        const totalLength = pathNode.getTotalLength();
        if (totalLength === 0) { console.error("[MarketOverviewSlide] totalLength is 0 for totalLinePath!"); return; }
        console.log(`[MarketOverviewSlide] Total line path length: ${totalLength}`);

        totalLinePath.style("visibility", "hidden");
        
        const lineAnimationStartTime = Date.now();
        const lineDuration = 3000;
        const dashLength = 8, gapLength = 7, segmentLength = dashLength + gapLength;
        
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const inverseEaseInOutCubic = (p: number): number => {
          if (p <= 0) return 0;
          if (p >= 1) return 1;
          if (p < 0.5) {
            return Math.cbrt(p / 4);
          } else {
            return 1 - Math.cbrt(2 * (1 - p)) / 2;
          }
        };
        
        const dotPositions: number[] = []; const dotSpacing = 150;
        for (let pos = 0; pos <= totalLength; pos += dotSpacing) { dotPositions.push(pos); }
        
        const distanceAhead = 100;
        const dotTriggerTimes = dotPositions.map(dotPositionOnPath => {
          const triggerLength = Math.max(0, dotPositionOnPath - distanceAhead);
          const targetProgressForTrigger = triggerLength / totalLength;
          const normalizedTime_t = inverseEaseInOutCubic(targetProgressForTrigger);
          return normalizedTime_t * lineDuration;
        });
        console.log("[MarketOverviewSlide] Dots will trigger at calculated times (ms from line anim start) based on inverse easing:", dotTriggerTimes);
        
        const dotGroups = dotsLayer.selectAll(".dot-group")
          .data(dotPositions)
          .enter()
          .append("g")
          .attr("class", "dot-group")
          .attr("transform", d => `translate(${pathNode.getPointAtLength(d).x}, ${pathNode.getPointAtLength(d).y})`);

        dotGroups.append("circle")
          .attr("class", "dot-outer-ring")
          .attr("r", 0)
          .style("fill", "none")
          .style("stroke", "#1E293B")
          .style("stroke-width", 4)
          .style("opacity", 0);

        dotGroups.append("circle")
          .attr("class", "dot-inner-fill")
          .attr("r", 0)
          .style("fill", "#FFFFFF")
          .style("opacity", 0);
        
        console.log(`[MarketOverviewSlide] Created ${dotGroups.nodes().length} dot groups.`);
                    
        function animateLineAndDots() {
          const elapsed = Date.now() - lineAnimationStartTime;
          const linearProgress = Math.min(elapsed / lineDuration, 1);
          const easedProgress = easeInOutCubic(linearProgress); 
          const drawnLength = totalLength * easedProgress;
          
          if (nextDotIndexRef.current < dotTriggerTimes.length && elapsed >= dotTriggerTimes[nextDotIndexRef.current]) {
            console.log(`[MarketOverviewSlide] Triggering dot group ${nextDotIndexRef.current} at elapsed ${elapsed.toFixed(2)}ms (scheduled: ${dotTriggerTimes[nextDotIndexRef.current].toFixed(2)}ms)`);
              
            const currentDotGroup = d3.select(dotGroups.nodes()[nextDotIndexRef.current]);

            currentDotGroup.select(".dot-outer-ring")
              .attr("r", 0)
              .style("opacity", 0)
              .transition()
              .duration(250)      
              .attr("r", 12)
              .style("opacity", 1)
              .transition()
              .duration(250)      
              .attr("r", 8);

            currentDotGroup.select(".dot-inner-fill")
              .attr("r", 0)
              .style("opacity", 0)
              .transition()
              .duration(250)      
              .attr("r", 12 - 2)
              .style("opacity", 1)
              .transition()
              .duration(250)      
              .attr("r", 8 - 2);

            nextDotIndexRef.current++;
          }
          
          lineSegmentsLayer.selectAll(".trace-segment").remove();
          let currentDrawnSegmentLength = 0;
          while (currentDrawnSegmentLength < drawnLength) {
            const segmentStart = currentDrawnSegmentLength;
            const segmentEnd = Math.min(currentDrawnSegmentLength + dashLength, drawnLength);
            if (segmentEnd > segmentStart) {
              const startPoint = pathNode.getPointAtLength(segmentStart);
              const endPoint = pathNode.getPointAtLength(segmentEnd);
              lineSegmentsLayer.append("line").attr("class", "trace-segment")
                .attr("x1", startPoint.x).attr("y1", startPoint.y).attr("x2", endPoint.x).attr("y2", endPoint.y)
                .style("stroke", "#1E293B").style("stroke-width", 3).style("stroke-linecap", "round");
            }
            currentDrawnSegmentLength += segmentLength;
          }
          
          if (linearProgress < 1) {
            animationFrameId.current = requestAnimationFrame(animateLineAndDots);
          } else {
            console.log("[MarketOverviewSlide] Line animation completed. Final nextDotIndex:", nextDotIndexRef.current);
            for (let i = nextDotIndexRef.current; i < dotTriggerTimes.length; i++) {
              if (elapsed >= dotTriggerTimes[i]) { 
                console.log(`[MarketOverviewSlide] Triggering tail-end dot group ${i} at elapsed ${elapsed.toFixed(2)}ms (scheduled: ${dotTriggerTimes[i].toFixed(2)}ms)`);
                const tailDotGroup = d3.select(dotGroups.nodes()[i]);
                tailDotGroup.select(".dot-outer-ring")
                  .attr("r", 0).style("opacity", 0)
                  .transition().duration(250).attr("r", 12).style("opacity", 1)
                  .transition().duration(250).attr("r", 8);
                tailDotGroup.select(".dot-inner-fill")
                  .attr("r", 0).style("opacity", 0)
                  .transition().duration(250).attr("r", 12 - 2).style("opacity", 1)
                  .transition().duration(250).attr("r", 8 - 2);
                nextDotIndexRef.current = i + 1;
              }
            }
          }
        }
        animationFrameId.current = requestAnimationFrame(animateLineAndDots);
      }, 4000) as number;

      const yearMarkerPoints = g.selectAll(".total-point").data(data).enter().append("circle")
        .attr("class", "total-point")
        .attr("cx", d => xScale(d.year)).attr("cy", d => yScale(d.total))
        .attr("r", 0).style("fill", "#FFFFFF").style("stroke", "#3B82F6").style("stroke-width", 2).style("opacity", 0);

      yearMarkerPoints.each(function(d, i) {
        const point = d3.select(this);
        const pointDelay = 4000 + (i / (data.length - 1)) * 3000;
        point.transition().duration(200).delay(pointDelay).attr("r", 4).style("opacity", 1)
          .on("start", function() {
            d3.select(this).transition().duration(150).attr("r", 7).transition().duration(150).attr("r", 4);
          });
      });
    } else {
      // Static dashed line for print theme
      g.append("path").datum(data).attr("d", line)
        .style("fill", "none")
        .style("stroke", "#000000")
        .style("stroke-width", 3)
        .style("stroke-dasharray", "8, 7"); // Use dasharray for a simpler dashed line in print

      g.selectAll(".total-point").data(data).enter().append("circle")
        .attr("cx", d => xScale(d.year)).attr("cy", d => yScale(d.total))
        .attr("r", 8)
        .style("fill", "#FFFFFF")
        .style("stroke", "#000000")
        .style("stroke-width", 3);
    }

    return () => {
      if (animationTimeoutId.current) window.clearTimeout(animationTimeoutId.current);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      d3.select(container).selectAll("*").remove(); // Ensure cleanup
    };
  }, [isPrintTheme]); // CRITICAL FIX: Re-run effect when isPrintTheme changes

  return (
    <div className={`${styles.contentContainer} ${isPrintTheme ? styles.printTheme : ''}`}> {/* Using CSS Modules */}
      <motion.div 
        className={styles.chartSection}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className={styles.chartTitle}>
          {isPrintTheme ? 'Динамика роста рынка СУБД по типам (2023-2030)' : '📈 Динамика роста рынка СУБД по типам (2023-2030)'}
        </h3>
        <div className={styles.chartContainer} ref={chartRef}></div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ 
              border: isPrintTheme ? '1px solid #000' : 'none',
              backgroundColor: isPrintTheme ? '#222222' : '#1E3A8A',
              backgroundImage: isPrintTheme ? 'repeating-linear-gradient(0deg, transparent, transparent 3px, #ffffff 3px, #ffffff 4px)' : 'none',
              backgroundSize: isPrintTheme ? '8px 8px' : 'auto'
            }}></div>
            <span>Реляционные СУБД</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ 
              border: isPrintTheme ? '1px solid #000' : 'none',
              backgroundColor: isPrintTheme ? '#ffffff' : '#3B82F6', 
              backgroundImage: isPrintTheme ? 'repeating-linear-gradient(45deg, #000000, #000000 1px, transparent 1px, transparent 7px)' : 'none'
            }}></div>
            <span>NoSQL СУБД</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ 
              border: isPrintTheme ? '1px solid #000' : 'none',
              backgroundColor: isPrintTheme ? '#ffffff' : '#60A5FA', 
              backgroundImage: isPrintTheme ? 'repeating-linear-gradient(90deg, #000000, #000000 1.5px, transparent 1.5px, transparent 6px)' : 'none'
            }}></div>
            <span>Облачные СУБД</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ 
              border: isPrintTheme ? '1px solid #000' : 'none',
              backgroundColor: isPrintTheme ? '#ffffff' : '#93C5FD',
              backgroundImage: isPrintTheme ? 'repeating-conic-gradient(#666 0% 25%, white 0% 50%)' : 'none',
              backgroundPosition: '0 0',
              backgroundSize: isPrintTheme ? '12px 12px' : 'auto'
            }}></div>
            <span>Графовые СУБД</span>
          </div>
          <div className={styles.legendItem}><div className={`${styles.legendColor} ${styles.totalLine}`}></div><span>Общий объем рынка</span></div>
        </div>
      </motion.div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarTopRow}>
          <MetricCard title={isPrintTheme ? "КЛЮЧЕВЫЕ МЕТРИКИ" : "🎯 КЛЮЧЕВЫЕ МЕТРИКИ"} variant="metrics" delay={0.4}>
            <div className={styles.metricItem}><div className={styles.metricLabel}>Общий рост рынка:</div><div className={styles.metricValue}>100.79 → 292.22 млрд USD</div></div>
            <div className={styles.metricItem}><div className={styles.metricLabel}>Темп роста (CAGR):</div><div className={styles.metricValue}>14.21% в год</div></div>
            <div className={styles.metricItem}><div className={styles.metricLabel}>NoSQL рост:</div><div className={styles.metricValue}><span className={styles.growthHighlight}>6-кратный</span></div></div>
            <div className={styles.metricItem}><div className={styles.metricLabel}>Облачные решения:</div><div className={styles.metricValue}>5.4x рост к 2030</div></div>
          </MetricCard>
          <MetricCard title={isPrintTheme ? "СТРУКТУРНЫЕ ИЗМЕНЕНИЯ" : "📊 СТРУКТУРНЫЕ ИЗМЕНЕНИЯ"} variant="trends" delay={0.6}>
            <div className={styles.trendItem}><div className={styles.trendTitle}>Реляционные СУБД</div><div className={styles.trendDesc}>Снижение доли с 70% до 55%</div></div>
            <div className={styles.trendItem}><div className={styles.trendTitle}>NoSQL системы</div><div className={styles.trendDesc}>Взрывной рост: 7.55 → 47.41 млрд USD</div></div>
            <div className={styles.trendItem}><div className={styles.trendTitle}>Облачные платформы</div><div className={styles.trendDesc}>Удвоение доли рынка</div></div>
            <div className={styles.trendItem}><div className={styles.trendTitle}>Графовые БД</div><div className={styles.trendDesc}>Новая ниша с 4x ростом</div></div>
          </MetricCard>
        </div>
        <div className={styles.sidebarBottomRow}>
          <MetricCard title={isPrintTheme ? "ДРАЙВЕРЫ РОСТА" : "💡 ДРАЙВЕРЫ РОСТА"} variant="insights" delay={0.8}>
            <div className={styles.insightItem}><strong>Цифровая трансформация</strong> предприятий</div>
            <div className={styles.insightItem}><strong>Экспоненциальный рост</strong> объемов данных</div>
            <div className={styles.insightItem}><strong>Потребность в масштабируемости</strong> и гибкости</div>
            <div className={styles.insightItem}><strong>Развитие IoT и Big Data</strong> технологий</div>
          </MetricCard>
        </div>
      </div>
    </div>
  )
} 