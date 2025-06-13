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

// Add isPrintTheme to props
interface DonutChartProps {
  isPrintTheme: boolean;
}

export const MarketShareDonutChart: React.FC<DonutChartProps> = ({ isPrintTheme }) => {
  const marketShareChartRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [htmlLabels, setHtmlLabels] = useState<HtmlLabelData[]>([]);

  // B&W Patterns for Print Mode - moved outside useEffect for JSX access
  const bwPatterns = [
    { id: 'horizontal-lines', d: 'M 0,2 L 8,2 M 0,6 L 8,6', stroke: '#000', width: 1 },
    { id: 'diagonal-lines', d: 'M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2', stroke: '#000', width: 0.8 },
    { id: 'vertical-lines', d: 'M 2,0 L 2,8 M 6,0 L 6,8', stroke: '#000', width: 1.5 },
    { id: 'checkerboard', d: 'M0,0 L4,0 L4,4 L0,4 Z M4,4 L8,4 L8,8 L4,8 Z', fill: '#555' }
  ];

  // Add isPrintTheme to dependency array
  useEffect(() => {
    if (marketShareChartRef.current && !marketShareChartRef.current.hasAttribute('data-chart-initialized-s8-donut')) {
      marketShareChartRef.current.setAttribute('data-chart-initialized-s8-donut', 'true');
      const chartContainer = marketShareChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <=0 || containerHeight <= 0) { return; }
      
      const legendReservedHeight = 25; 
      const effectiveHeight = containerHeight - legendReservedHeight;
      
      // Add significant margin for external labels in print mode, shrinking the donut to make space
      const margin = isPrintTheme ? 
        { top: 30, right: 50, bottom: 30, left: 50 } : 
        { top: 5, right: 5, bottom: 5, left: 5 }; 
      
      const width = containerWidth - margin.left - margin.right;
      const height = effectiveHeight - margin.top - margin.bottom;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select(marketShareChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", effectiveHeight)
        .append("g")
        // Center the group within the new margined area
        .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);

      const pie = d3.pie<any>().value((d: any) => d.value).sort(null);
      const arc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.55).outerRadius(radius * 1.0);
      const hoverArc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.50).outerRadius(radius * 1.08);

      const defs = svg.append("defs");

      if (isPrintTheme) {
        benchmarkTypesData.forEach((_, i) => {
          const p = bwPatterns[i % bwPatterns.length];
          const pattern = defs.append("pattern")
            .attr("id", `donut-pattern-${i}`)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", 8).attr("height", 8);
          pattern.append("rect").attr("width", 8).attr("height", 8).attr("fill", "white");
          if (p.fill) {
            pattern.append("path").attr("d", p.d).attr("fill", p.fill);
          } else {
            pattern.append("path").attr("d", p.d).attr("stroke", p.stroke || "#000").attr("stroke-width", p.width || 1).attr("fill", "none");
          }
        });
      } else {
        // Color gradient logic
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
      }

      const arcs = svg.selectAll(".arc")
        .data(pie(benchmarkTypesData))
        .enter().append("g")
        .attr("class", "arc");

      // Enhanced path animations with elastic effect
      const paths = arcs.append("path")
        .style("fill", (d: any, i: number) => isPrintTheme ? `url(#donut-pattern-${i})` : `url(#donut-gradient-${i})`)
        .style("stroke", isPrintTheme ? '#000' : "#ffffff")
        .style("stroke-width", isPrintTheme ? 1 : 3)
        .style("opacity", isPrintTheme ? 1 : 0)
        .style("filter", isPrintTheme ? "none" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
        .style("cursor", isPrintTheme ? "default" : "pointer");

      // Conditional Animation
      if (!isPrintTheme) {
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
      } else {
        // For print theme, just draw the final state without animation
        paths.attr("d", arc as any);

        // Add leader lines and external labels for print theme
        const outerArc = d3.arc<any, d3.PieArcDatum<any>>()
            .innerRadius(radius * 1.1)
            .outerRadius(radius * 1.1);

        const labelGroup = svg.append("g").attr("class", "labels");

        labelGroup.selectAll('polyline')
          .data(pie(benchmarkTypesData))
          .enter()
          .append('polyline')
          .style("fill", "none")
          .attr("stroke", "black")
          .style("stroke-width", "1px")
          .attr('points', (d: any) => {
              const posA = arc.centroid(d); 
              const posB = outerArc.centroid(d);
              const posC = outerArc.centroid(d);
              const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
              posC[0] = radius * 1.2 * (midangle < Math.PI ? 1 : -1); // Extend line further
              return [posA, posB, posC] as any;
          });

        labelGroup.selectAll('text')
          .data(pie(benchmarkTypesData))
          .enter()
          .append('text')
          .text((d: any) => `${d.data.value}%`)
          .attr('transform', (d: any) => {
              const pos = outerArc.centroid(d);
              const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              pos[0] = radius * 1.25 * (midangle < Math.PI ? 1 : -1); // Push text even further
              pos[1] += 5; // Nudge text down for better alignment
              return `translate(${pos})`;
          })
          .style('text-anchor', (d: any) => {
              const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              return (midangle < Math.PI ? 'start' : 'end')
          })
          .style("font-size", "18px") // Make them bigger
          .style("font-weight", "bold")
          .style("fill", "black");
      }

      // Calculate positions for HTML labels for color mode only
      if (!isPrintTheme) {
        const textPositionArc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.65).outerRadius(radius * 0.85);

        const calculatedLabels: HtmlLabelData[] = pie(benchmarkTypesData).map((d_pie: any) => {
          const [x, y] = textPositionArc.centroid(d_pie);
          return {
            id: d_pie.data.type,
            text: `${d_pie.data.value}%`,
            x: containerWidth / 2 + x,
            y: effectiveHeight / 2 + y,
            fontSize: radius < 60 ? '14px' : '18px',
          };
        });
        setHtmlLabels(calculatedLabels);
      }
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
  }, [isPrintTheme]);

  // Helper function to create a data URI for an SVG pattern
  const createSvgPatternDataUri = (pattern: { d: string, stroke?: string, fill?: string, width?: number }) => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="white" stroke="#ccc"/><path d="${pattern.d}" stroke="${pattern.stroke || 'none'}" fill="${pattern.fill || 'none'}" stroke-width="${pattern.width || 1}"/></svg>`;
    // Use btoa to base64 encode the SVG. This is more robust than URL encoding.
    return `url("data:image/svg+xml;base64,${btoa(svgString)}")`;
  };

  return (
    <div className={styles.donutInternalWrapper} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className={`chart ${styles.sidebarDonutChartS8}`} ref={marketShareChartRef} style={{ width: '100%', height: '100%' }}></div>
      {!isPrintTheme && htmlLabels.map((label, index) => (
        <motion.div
          key={label.id}
          style={{
            position: 'absolute',
            left: `${label.x}px`,
            top: `${label.y}px`,
            transform: 'translate(-50%, -50%)',
            color: isPrintTheme ? '#000' : '#ffffff',
            fontSize: label.fontSize,
            fontWeight: '800',
            textShadow: isPrintTheme ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)',
            pointerEvents: 'none', // So they don't interfere with SVG hover
          }}
          initial={isPrintTheme ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={isPrintTheme ? { duration: 0 } : {
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
            initial={isPrintTheme ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={isPrintTheme ? { duration: 0 } : {
              duration: 0.6,
              delay: 1.5 + index * 0.2,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
            whileHover={isPrintTheme ? {} : {
              x: 5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className={styles.legendColorS8}
              style={
                isPrintTheme ? {
                  border: '1px solid black',
                  backgroundImage: createSvgPatternDataUri(bwPatterns[index % bwPatterns.length])
                } : { backgroundColor: item.color }
              }
              initial={isPrintTheme ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={isPrintTheme ? { duration: 0 } : {
                duration: 0.5,
                delay: 1.7 + index * 0.2,
                ease: [0.68, -0.55, 0.265, 1.55]
              }}
              whileHover={isPrintTheme ? {} : {
                scale: 1.2,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            />
            <motion.span
              initial={isPrintTheme ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={isPrintTheme ? { duration: 0 } : {
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