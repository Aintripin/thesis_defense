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
  const animationTimeoutId = useRef<NodeJS.Timeout | null>(null)
  const nextDotIndexRef = useRef<number>(0)

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const container = chartRef.current;
    d3.select(container).selectAll("*").remove();
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
            pattern.append("rect").attr("width", 8).attr("height", 8).attr("fill", "#222");
            pattern.append("path")
              .attr("d", "M 0,2 L 8,2 M 0,6 L 8,6")
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 1);
            break;
          case "diagonal-lines":
            pattern.attr("width", 10).attr("height", 10);
            pattern.append("rect").attr("width", 10).attr("height", 10).attr("fill", "white");
            pattern.append("path")
              .attr("d", "M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4")
              .attr("stroke", "#000000")
              .attr("stroke-width", 1.2);
            break;
          case "vertical-lines":
            pattern.attr("width", 12).attr("height", 12);
            pattern.append("rect").attr("width", 12).attr("height", 12).attr("fill", "white");
            pattern.append("path")
              .attr("d", "M 3,0 L 3,12 M 9,0 L 9,12")
              .attr("stroke", "#000000")
              .attr("stroke-width", 1.5);
            break;
          case "checkerboard":
            pattern.attr("width", 12).attr("height", 12);
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

    const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.year) as [number, number]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total)! * 1.1]).range([height, 0]);

    g.append("g").attr("class", "grid").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale).tickSize(-height).tickFormat("" as any));
    g.append("g").attr("class", "grid").call(d3.axisLeft(yScale).tickSize(-width).tickFormat("" as any));

    const stack = d3.stack<any>().keys(categories.map(d => d.key)).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
    const stackedData = stack(data);
    const areaGenerator = d3.area<any>().x(d => xScale(d.data.year)).y0(d => yScale(d[0])).y1(d => yScale(d[1])).curve(d3.curveCardinal);

    const areas = g.selectAll(".area").data(stackedData).enter().append("path").attr("class", "area")
      .style("fill", (_d, i) => isPrintTheme ? `url(#pattern-${categories[i].key})` : `url(#gradient-${categories[i].key})`)
      .style("stroke", (_d, i) => isPrintTheme ? "#000000" : categories[i].color)
      .style("stroke-width", isPrintTheme ? 1 : 1.5);

    if (!isPrintTheme) {
      areas.each(function(areaData, i) {
        const path = d3.select(this); 
        const originalPathD = areaGenerator(areaData as any);
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
              if (oscillationTime < maxOscillationTime) { 
                const settleArea = d3.area<any>().x(d => xScale(d.data.year)).y0(d => yScale(d[0])).y1(d => yScale(d[1]) + settleAmplitude * Math.sin(frequency * xScale(d.data.year) + currentPhase)).curve(d3.curveCardinal); 
                path.attr("d", settleArea(areaData as any)); 
                animationTimeoutId.current = setTimeout(settle, 50); 
              } else { 
                path.transition().duration(500).attr("d", originalPathD); 
              }
            }; 
            animationTimeoutId.current = setTimeout(settle, 200);
          }
        }
        animationFrameId.current = requestAnimationFrame(animateRise);
      });
    } else {
      areas.attr("d", areaGenerator as any);
    }

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale).tickFormat(d3.format("d"))).selectAll("text").style("fill", isPrintTheme ? "#000000" : "#475569").style("font-size", "16px").style("font-weight", "500");
    g.append("g").call(d3.axisLeft(yScale)).selectAll("text").style("fill", isPrintTheme ? "#000000" : "#475569").style("font-size", "16px").style("font-weight", "500");
    g.selectAll(".domain").style("stroke", isPrintTheme ? "#000000" : "#64748B"); 
    g.selectAll(".tick line").style("stroke", isPrintTheme ? "#000000" : "#64748B");
    g.append("text").attr("x", width / 2).attr("y", height + 65).attr("fill", isPrintTheme ? "#000000" : "#475569").style("text-anchor", "middle").style("font-size", "22px").style("font-weight", "bold").style("font-family", "'ALS Sector Regular', sans-serif").text("Год");
    g.append("text").attr("transform", "rotate(-90)").attr("y", -65).attr("x", -height / 2).attr("fill", isPrintTheme ? "#000000" : "#475569").style("text-anchor", "middle").style("font-size", "22px").style("font-weight", "bold").style("font-family", "'ALS Sector Regular', sans-serif").text("Объём рынка (млрд USD)");

    const yearMarkerPoints = g.selectAll(".year-marker-point")
      .data(data)
      .enter().append("g")
      .attr("class", "year-marker-point")
      .attr("transform", d => `translate(${xScale(d.year)}, 0)`);

    yearMarkerPoints.each(function(d, i) {
      const g_ = d3.select(this);
      const isFirstOrLast = i === 0 || i === data.length - 1;
      const pointDelay = 4000 + (i / (data.length - 1)) * 3000;

      g_.append("circle").attr("class", "year-marker").attr("cy", yScale(d.total))
        .attr("r", 4).style("fill", "#FFFFFF").style("stroke", "#3B82F6").style("stroke-width", 2).style("opacity", 0)
        .transition().duration(200).delay(pointDelay).attr("r", 4).style("opacity", 1)
        .on("start", function() {
          d3.select(this).transition().duration(150).attr("r", 7).transition().duration(150).attr("r", 4);
        });

      g_.append("text").attr("class", "value-label").attr("x", 0)
        .attr("y", -10).text(d.total.toFixed(2) + "B").style("font-size", "14px").style("fill", "#1E293B").style("text-anchor", "middle").style("opacity", 0).transition().delay(pointDelay + 200).duration(200).style("opacity", 1);

      if (isFirstOrLast) {
        const textLabel = g_.append("text").attr("class", "year-label").attr("x", 0)
          .attr("y", 25).text(d.year).style("font-size", "14px").style("fill", "#475569").style("text-anchor", "middle").style("opacity", 0).transition().delay(pointDelay).duration(200).style("opacity", 1);
        
        if (i === 0) textLabel.attr("text-anchor", "start");
        if (i === data.length - 1) textLabel.attr("text-anchor", "end");
      }
    });
    const legendItemSize = 20;
    const legendItemY = -10;

    const legend = svg.append("g").attr("class", "legend")
      .attr("transform", `translate(${margin.left}, ${height + margin.bottom - 40})`);

    const legendItems = legend.selectAll(".legend-item").data(categories).enter()
      .append("g").attr("class", "legend-item")
      .attr("transform", (_d, i) => `translate(${i * 200}, 0)`);

    legendItems.append("rect")
      .attr("x", 0)
      .attr("y", legendItemY)
      .attr("width", legendItemSize)
      .attr("height", legendItemSize)
      .style("fill", (_d, i) => isPrintTheme ? `url(#pattern-${categories[i].key})` : `url(#gradient-${categories[i].key})`)
      .style("stroke", (_d, i) => isPrintTheme ? "#000000" : categories[i].color)
      .style("stroke-width", 1);

    legendItems.append("text")
      .attr("x", legendItemSize + 5)
      .attr("y", legendItemY + legendItemSize / 2)
      .attr("dy", "0.35em")
      .text(d => d.name)
      .style("font-family", "'Inter', sans-serif")
      .style("font-size", "16px")
      .style("fill", isPrintTheme ? "#000" : "#334155");

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (animationTimeoutId.current) clearTimeout(animationTimeoutId.current);
    };
  }, [isPrintTheme]);

  return (
    <div className={styles.slideContainer}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className={styles.mainTitle}>
          Р Ы Н О Ч Н Ы Е&nbsp;&nbsp;Т Р Е Н Д Ы&nbsp;&nbsp;И&nbsp;&nbsp;П Р О Г Н О З Ы&nbsp;&nbsp;Р А З В И Т И Я
        </h1>
      </motion.div>
      <div className={styles.content}>
        <div ref={chartRef} className={styles.chartContainer}></div>
        <div className={styles.metricsContainer}>
          <MetricCard title="Ключевые показатели роста" delay={0.2} variant="metrics">
            <ul className={styles.metricList}>
              <li>CAGR (совокупный годовой темп роста): <span className={styles.highlight}>~15%</span></li>
              <li>Прогноз на 2030 год: <span className={styles.highlight}>$292 млрд</span></li>
              <li>Драйверы: <span className={styles.highlight}>Big Data, IoT, AI/ML</span></li>
            </ul>
          </MetricCard>
          <MetricCard title="Тенденции по сегментам" delay={0.4} variant="trends">
            <ul className={styles.metricList}>
              <li>NoSQL: <span className={styles.highlight}>Самый быстрый рост</span></li>
              <li>Облачные СУБД: <span className={styles.highlight}>Основной вектор развития</span></li>
              <li>Реляционные СУБД: <span className={styles.highlight}>Стабильная доля</span></li>
            </ul>
          </MetricCard>
          <MetricCard title="Инсайты" delay={0.6} variant="insights">
            <ul className={styles.metricList}>
              <li>Гибридные и мультимодельные СУБД в приоритете</li>
              <li>Serverless-архитектуры упрощают развертывание</li>
              <li>Data-as-a-Service (DaaS) становится стандартом</li>
            </ul>
          </MetricCard>
        </div>
      </div>
    </div>
  );
}; 