import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './RegionalTrendsAreaChart.module.scss';
import { regionTrendsData, regionalChartCategories } from '../../data';

interface ChartProps {
  isPrintTheme: boolean;
}

export const RegionalTrendsAreaChart: React.FC<ChartProps> = ({ isPrintTheme }) => {
  const regionalTrendsChartRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // B&W Patterns for Print Mode
  const bwPatterns = [
    { id: 'horizontal-lines', d: 'M 0,2 L 8,2 M 0,6 L 8,6', stroke: '#000', width: 1 },
    { id: 'diagonal-lines', d: 'M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4', stroke: '#000', width: 1.2 },
    { id: 'vertical-lines', d: 'M 3,0 L 3,12 M 9,0 L 9,12', stroke: '#000', width: 1.5 },
    { id: 'checkerboard', d: 'M0,0 L6,0 L6,6 L0,6 Z M6,6 L12,6 L12,12 L6,12 Z', fill: '#666' }
  ];

  useEffect(() => {
    if (regionalTrendsChartRef.current && !regionalTrendsChartRef.current.hasAttribute('data-chart-initialized-s8-region-trends')) {
      regionalTrendsChartRef.current.setAttribute('data-chart-initialized-s8-region-trends', 'true');
      const chartContainer = regionalTrendsChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <= 0 || containerHeight <= 0) { return; }
      
      // Reserve space for legend by reducing effective height
      const legendReservedHeight = 10;
      const effectiveHeight = containerHeight - legendReservedHeight;
      
      const margin = { top: 20, right: 30, bottom: 40, left: 70 };
      const width = containerWidth - margin.left - margin.right;
      const height = effectiveHeight - margin.top - margin.bottom;
      
      const svg = d3.select(regionalTrendsChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", effectiveHeight + 20); // Add 20px to accommodate the "Год" label
      
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(regionTrendsData, d => d.year) as [number, number])
        .range([0, width]);
      
      const stack = d3.stack<any>().keys(regionalChartCategories.map(c => c.key));
      const stackedData = stack(regionTrendsData);
      
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])! * 1.05])
        .range([height, 0]);

      g.append("g").attr("class", "grid grid-s8")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(() => ""));
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(() => ""));

      const defs = svg.append("defs");

      if (isPrintTheme) {
        regionalChartCategories.forEach((_, i) => {
          const p = bwPatterns[i % bwPatterns.length];
          const pattern = defs.append("pattern")
            .attr("id", `area-pattern-${i}`)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", p.id === 'checkerboard' ? 12 : (p.id === 'vertical-lines' ? 12 : 8))
            .attr("height", p.id === 'checkerboard' ? 12 : (p.id === 'vertical-lines' ? 12 : 8));
          pattern.append("rect")
            .attr("width", p.id === 'checkerboard' ? 12 : (p.id === 'vertical-lines' ? 12 : 8))
            .attr("height", p.id === 'checkerboard' ? 12 : (p.id === 'vertical-lines' ? 12 : 8))
            .attr("fill", "white");
          if (p.fill) {
            pattern.append("path").attr("d", p.d).attr("fill", p.fill);
          } else {
            pattern.append("path").attr("d", p.d).attr("stroke", p.stroke || "#000").attr("stroke-width", p.width || 1).attr("fill", "none");
          }
        });
      }

      const areaGenerator = d3.area<any>()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveCardinal.tension(0.5));

      const areas = g.selectAll(".area-region")
        .data(stackedData)
        .enter().append("path")
        .attr("class", "area-region")
        .style("fill", (_d, i) => isPrintTheme ? `url(#area-pattern-${i})` : regionalChartCategories[i].color)
        .style("stroke", (_d, i) => isPrintTheme ? '#000' : (d3.color(regionalChartCategories[i].color)?.darker(0.7).toString() || regionalChartCategories[i].color))
        .style("stroke-width", 1);

      // Enhanced animations with wavy effects and oscillation
      areas.each(function(areaData, i) {
        const path = d3.select(this);
        const originalPath = areaGenerator(areaData as any);
        const startArea = d3.area<any>()
          .x(d => xScale(d.data.year))
          .y0(_ => yScale(0))
          .y1(_ => yScale(0))
          .curve(d3.curveCardinal.tension(0.5));
        
        path.attr("d", startArea(areaData as any));
        
        let progress = 0;
        let currentAmplitude = 8;
        let currentPhase = 0;
        const frequency = 0.015;
        const areaTotalDuration = 2000;
        const areaStartTime = Date.now() + (i * 400);
        
        function animateRise() {
          const now = Date.now();
          if (now < areaStartTime) {
            animationFrameId.current = requestAnimationFrame(animateRise);
            return;
          }
          
          const elapsed = now - areaStartTime;
          progress = Math.min(elapsed / areaTotalDuration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          // Reduce wave amplitude as we get closer to final position
          currentAmplitude = 8 * (1 - progress * 0.7);
          currentPhase += 0.2;
          
          const risingArea = d3.area<any>()
            .x(d => xScale(d.data.year))
            .y0(d => yScale(0) + (yScale(d[0]) - yScale(0)) * easeProgress)
            .y1(d => {
              const finalY = yScale(d[1]);
              const currentY = yScale(0) + (finalY - yScale(0)) * easeProgress;
              const wave = currentAmplitude * Math.sin(frequency * xScale(d.data.year) + currentPhase);
              return currentY + wave;
            })
            .curve(d3.curveCardinal.tension(0.5));
          
          path.attr("d", risingArea(areaData as any));
          
          if (progress < 1) {
            animationFrameId.current = requestAnimationFrame(animateRise);
          } else {
            // Start settling oscillation that continues forever
            let settleAmplitude = 5;
            let oscillationTime = 0;
            
            const settle = () => {
              oscillationTime += 50;
              const dampingFactor = Math.max(0.3, 1 - (oscillationTime / 8000)); // Slower, less damping
              settleAmplitude = 5 * dampingFactor;
              currentPhase += 0.15;
              
              const settleArea = d3.area<any>()
                .x(d => xScale(d.data.year))
                .y0(d => {
                  const baseY0 = yScale(d[0]);
                  const wave = settleAmplitude * Math.sin(frequency * xScale(d.data.year) + currentPhase);
                  // For bottom area (where d[0] = 0), don't let it go below the X-axis
                  if (d[0] === 0) {
                    return Math.min(baseY0 + wave, yScale(0));
                  }
                  // For other areas, make them thicker by pushing y0 further down
                  return baseY0 + wave + 5;
                })
                .y1(d => {
                  const baseY1 = yScale(d[1]);
                  const wave = settleAmplitude * Math.sin(frequency * xScale(d.data.year) + currentPhase);
                  // Make area thicker by pushing y1 further up (away from y0)
                  return baseY1 + wave - 5;
                })
                .curve(d3.curveCardinal.tension(0.5));
              
              path.attr("d", settleArea(areaData as any));
              setTimeout(settle, 50); // Keep oscillating forever
            };
            setTimeout(settle, 200);
          }
        }
        
        animationFrameId.current = requestAnimationFrame(animateRise);
      });

      const xAxisGroup = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
      xAxisGroup.selectAll("text").style("fill", isPrintTheme ? "#000" : "#475569").style("font-size", "14px");
      xAxisGroup.selectAll(".domain").style("stroke", isPrintTheme ? "#000" : "#AEB8C4"); 
      xAxisGroup.selectAll("line").style("stroke", isPrintTheme ? "#000" : "#AEB8C4");
      
      const yAxisGroup = g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));
      yAxisGroup.selectAll("text").style("fill", isPrintTheme ? "#000" : "#475569").style("font-size", "14px");
      yAxisGroup.selectAll(".domain").style("stroke", isPrintTheme ? "#000" : "#AEB8C4"); 
      yAxisGroup.selectAll("line").style("stroke", isPrintTheme ? "#000" : "#AEB8C4");

      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", effectiveHeight + 8)
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .text("Год");
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(margin.top + height / 2))
        .attr("y", 15)
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .text("Доля рынка (%)");
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (regionalTrendsChartRef.current) {
        d3.select(regionalTrendsChartRef.current).selectAll("*").remove();
        regionalTrendsChartRef.current.removeAttribute('data-chart-initialized-s8-region-trends');
      }
    };
  }, [isPrintTheme]);

  // Helper function to create a data URI for an SVG pattern
  const createSvgPatternDataUri = (pattern: { d: string, stroke?: string, fill?: string, width?: number }) => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="white" stroke="#ccc"/><path d="${pattern.d}" stroke="${pattern.stroke || 'none'}" fill="${pattern.fill || 'none'}" stroke-width="${pattern.width || 1}"/></svg>`;
    // Use btoa to base64 encode the SVG. This is more robust than URL encoding.
    return `url("data:image/svg+xml;base64,${btoa(svgString)}")`;
  };

  return (
    <>
      <h3 className="chart-title-s8">Прогноз роста внедрения по регионам</h3>
      <div className={styles.chart} ref={regionalTrendsChartRef}></div>
      <div className={styles.legendS8Regional}>
        {regionalChartCategories.map((cat, i) => (
          <div key={cat.key} className={styles.legendItemS8}>
            <div 
              className={styles.legendColorS8} 
              style={
                isPrintTheme ? {
                  border: '1px solid black',
                  backgroundImage: createSvgPatternDataUri(bwPatterns[i % bwPatterns.length])
                } : { backgroundColor: cat.color }
              }
            ></div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}; 