import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import styles from './MarketShareDonutChart.module.scss';
import { benchmarkTypesData } from '../../data';

interface HtmlLabelData {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: string;
}

export const MarketShareDonutChart: React.FC = () => {
  const marketShareChartRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [htmlLabels, setHtmlLabels] = useState<HtmlLabelData[]>([]);

  useEffect(() => {
    if (marketShareChartRef.current && !marketShareChartRef.current.hasAttribute('data-chart-initialized-s8-donut')) {
      marketShareChartRef.current.setAttribute('data-chart-initialized-s8-donut', 'true');
      const chartContainer = marketShareChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <=0 || containerHeight <= 0) { return; }
      
      // Reserve space for legend by reducing effective height
      const legendReservedHeight = 25; // Reduced from 40 to make donut bigger
      const effectiveHeight = containerHeight - legendReservedHeight;
      
      const margin = { top: 5, right: 5, bottom: 5, left: 5 }; // Reduced margins
      const width = containerWidth - margin.left - margin.right;
      const height = effectiveHeight - margin.top - margin.bottom; // Use effectiveHeight
      const radius = Math.min(width, height) / 2;

      const svg = d3.select(marketShareChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", effectiveHeight) // Use effectiveHeight
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${effectiveHeight / 2})`); // Center in effective area

      const pie = d3.pie<any>().value((d: any) => d.value).sort(null);
      const arc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.55).outerRadius(radius * 1.0);
      const hoverArc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.50).outerRadius(radius * 1.08);

      // Create gradients for each slice
      const defs = svg.append("defs");
      benchmarkTypesData.forEach((item, i) => {
        const gradient = defs.append("radialGradient")
          .attr("id", `donut-gradient-${i}`)
          .attr("cx", "30%")
          .attr("cy", "30%");
        gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", d3.color(item.color)?.brighter(0.3).toString() || item.color);
        gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", d3.color(item.color)?.darker(0.2).toString() || item.color);
      });

      const arcs = svg.selectAll(".arc")
        .data(pie(benchmarkTypesData))
        .enter().append("g")
        .attr("class", "arc");

      // Enhanced path animations with elastic effect
      const paths = arcs.append("path")
        .style("fill", (d: any, i: number) => `url(#donut-gradient-${i})`)
        .style("stroke", "#ffffff")
        .style("stroke-width", 3)
        .style("opacity", 0)
        .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
        .style("cursor", "pointer");

      // Add hover effects
      paths.on("mouseenter", function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", hoverArc(d))
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");
      })
      .on("mouseleave", function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc(d))
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");
      });

      // Slick elastic growth animation
      paths.each(function(d: any, i: number) {
        const path = d3.select(this);
        
        // Start from zero angle
        const startAngle = d.startAngle;
        d.endAngle = d.startAngle;
        path.attr("d", arc(d));
        
        // Animate with elastic easing
        path
          .transition()
          .duration(1200)
          .delay(i * 200)
          .ease(d3.easeElasticOut.amplitude(1).period(0.4))
          .style("opacity", 1)
          .attrTween("d", function() {
            const endAngle = startAngle + (d.data.value / 100) * 2 * Math.PI;
            const interpolate = d3.interpolate(d.startAngle, endAngle);
            return function(t: number) {
              d.endAngle = interpolate(t);
              const pathData = arc(d);
              return pathData === null ? "" : pathData;
            };
          });
      });

      // Calculate positions for HTML labels
      // Use a text arc slightly more inset for robust positioning
      const textPositionArc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.65).outerRadius(radius * 0.85); // Adjusted for larger donut

      const calculatedLabels: HtmlLabelData[] = pie(benchmarkTypesData).map((d_pie: any) => {
        const [x, y] = textPositionArc.centroid(d_pie);
        return {
          id: d_pie.data.type,
          text: `${d_pie.data.value}%`,
          // Position relative to the SVG container's top-left (using effective area)
          x: containerWidth / 2 + x,
          y: effectiveHeight / 2 + y, // Use effectiveHeight for proper positioning
          fontSize: radius < 60 ? '14px' : '18px',
        };
      });
      setHtmlLabels(calculatedLabels);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (marketShareChartRef.current) {
        d3.select(marketShareChartRef.current).selectAll("*").remove();
        marketShareChartRef.current.removeAttribute('data-chart-initialized-s8-donut');
      }
      setHtmlLabels([]); // Clear labels on unmount
    };
  }, []);

  return (
    <div className={styles.donutInternalWrapper} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className={`chart ${styles.sidebarDonutChartS8}`} ref={marketShareChartRef} style={{ width: '100%', height: '100%' }}></div>
      {htmlLabels.map((label, index) => (
        <motion.div
          key={label.id}
          style={{
            position: 'absolute',
            left: `${label.x}px`,
            top: `${label.y}px`,
            transform: 'translate(-50%, -50%)',
            color: '#ffffff',
            fontSize: label.fontSize,
            fontWeight: '800',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            pointerEvents: 'none', // So they don't interfere with SVG hover
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.0 + index * 0.2, // Timed to appear after arcs
            ease: [0.68, -0.55, 0.265, 1.55] // easeOutBack
          }}
        >
          {label.text}
        </motion.div>
      ))}
      <div className={styles.legendS8Donut}>
        {benchmarkTypesData.map((item, index) => (
          <motion.div
            key={item.type}
            className={styles.legendItemS8}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.5 + index * 0.2,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
            whileHover={{
              x: 5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className={styles.legendColorS8}
              style={{ backgroundColor: item.color }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.7 + index * 0.2,
                ease: [0.68, -0.55, 0.265, 1.55]
              }}
              whileHover={{
                scale: 1.2,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 1.9 + index * 0.2
              }}
            >
              {item.type} ({item.value}%)
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 