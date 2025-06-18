import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './IndustryAdoptionBarChart.module.scss'; // Import as module
import { industryData } from '../../data';

interface ChartProps {
  isPrintTheme: boolean;
}

interface IndustryData {
  industry: string;
  shortName: string;
  percent: number;
  color?: string;
}

export const IndustryAdoptionBarChart: React.FC<ChartProps> = ({ isPrintTheme }) => {
  const industryAdoptionChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (industryAdoptionChartRef.current && !industryAdoptionChartRef.current.hasAttribute('data-chart-initialized-s8-industry')) {
      industryAdoptionChartRef.current.setAttribute('data-chart-initialized-s8-industry', 'true');
      const chartContainer = industryAdoptionChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <= 0 || containerHeight <= 0) { return; }
      
      // Reduce height to make chart more compact (no legend needed)
      const heightReduction = 10; // Reduced from 30 to give more room for diagonal labels
      const effectiveHeight = containerHeight - heightReduction;
      
      const margin = { top: 20, right: 20, bottom: 70, left: 70 }; // Increased bottom margin from 50 to 70 for diagonal labels
      const width = containerWidth - margin.left - margin.right;
      const height = effectiveHeight - margin.top - margin.bottom; // Use effectiveHeight
      
      const svg = d3.select(industryAdoptionChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", effectiveHeight + 30); // Add 30px to accommodate diagonal labels
      
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      
      const xScale = d3.scaleBand()
        .domain(industryData.map(d => d.shortName))
        .range([0, width])
        .padding(0.2);
      
      const yScaleInd = d3.scaleLinear()
        .domain([0, d3.max(industryData, d => d.percent)! * 1.05])
        .range([height, 0]);

      // Enhanced gridlines with glow effect
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScaleInd).tickSize(-width).ticks(4).tickFormat(() => ""))
        .style("opacity", 0.7);
      g.selectAll(".grid .domain").remove();

      // Create gradient definitions for bars or patterns for print
      const defs = svg.append("defs");
      
      // B&W Patterns for Print Mode
      const bwPatterns = [
        { id: 'horizontal-lines', d: 'M 0,2 L 8,2 M 0,6 L 8,6', stroke: '#000', width: 1 },
        { id: 'diagonal-lines', d: 'M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4', stroke: '#000', width: 1.2 },
        { id: 'vertical-lines', d: 'M 3,0 L 3,12 M 9,0 L 9,12', stroke: '#000', width: 1.5 },
        { id: 'checkerboard', d: 'M0,0 L6,0 L6,6 L0,6 Z M6,6 L12,6 L12,12 L6,12 Z', fill: '#666' },
        { id: 'dots', d: 'M2,2 L4,2 L4,4 L2,4 Z M8,8 L10,8 L10,10 L8,10 Z', fill: '#555' }
      ];

      if (isPrintTheme) {
        industryData.forEach((_, i) => {
          const p = bwPatterns[i % bwPatterns.length];
          const pattern = defs.append("pattern")
            .attr("id", `bar-pattern-${i}`)
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
      } else {
        industryData.forEach((item, i) => {
          const gradient = defs.append("linearGradient")
            .attr("id", `bar-gradient-${i}`)
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%");
          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.color(item.color || "#3B82F6")?.darker(0.3).toString() || item.color || "#3B82F6");
          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.color(item.color || "#3B82F6")?.brighter(0.2).toString() || item.color || "#3B82F6");
        });
      }

      const bars = g.selectAll(".bar-industry")
        .data(industryData)
        .enter().append("rect")
        .attr("class", "bar-industry")
        .attr("x", (d: IndustryData) => xScale(d.shortName)!)
        .attr("y", (d: IndustryData) => isPrintTheme ? yScaleInd(d.percent) : height)
        .attr("width", xScale.bandwidth())
        .attr("height", (d: IndustryData) => isPrintTheme ? height - yScaleInd(d.percent) : 0)
        .attr("fill", (_d, i) => isPrintTheme ? `url(#bar-pattern-${i})` : `url(#bar-gradient-${i})`)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("filter", isPrintTheme ? "none" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
        .style("stroke", isPrintTheme ? "#000" : "#ffffff")
        .style("stroke-width", isPrintTheme ? 1 : 1);

      // Conditional Animation
      if (!isPrintTheme) {
        // Enhanced elastic bar animation
        bars.transition()
          .duration(1400)
          .delay((_d, i) => i * 150)
          .ease(d3.easeElasticOut.amplitude(1).period(0.6))
          .attr("y", (d: any) => yScaleInd(d.percent))
          .attr("height", (d: any) => height - yScaleInd(d.percent))
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");
      }

      // Enhanced labels with bigger, bolder text and counting animation
      const labels = g.selectAll(".label-industry")
        .data(industryData)
        .enter().append("text")
        .attr("class", "label-industry")
        .attr("x", (d: IndustryData) => xScale(d.shortName)! + xScale.bandwidth() / 2)
        .attr("y", (d: IndustryData) => isPrintTheme ? yScaleInd(d.percent) : height)
        .attr("text-anchor", "middle")
        .attr("dy", "-0.8em")
        .style("font-size", "16px") // Much bigger font
        .style("fill", isPrintTheme ? "#000" : "#1E293B")
        .style("font-weight", "800") // Extra bold
        .style("text-shadow", isPrintTheme ? "none" : "1px 1px 2px rgba(255,255,255,0.8)")
        .style("opacity", isPrintTheme ? 1 : 0)
        .text((d: IndustryData) => isPrintTheme ? `${d.percent}%` : "0%"); // Start with 0 for animation or final value for print

      if (!isPrintTheme) {
        // Animated number counting effect
        labels.each(function(d: any, i) {
          const label = d3.select(this);
          const finalValue = d.percent;
          
          // Start counting animation after bar starts growing
          setTimeout(() => {
            let currentValue = 0;
            const duration = 1200;
            const startTime = Date.now();
            
            const countUp = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
              
              currentValue = Math.round(easedProgress * finalValue);
              label.text(`${currentValue}%`);
              
              if (progress < 1) {
                requestAnimationFrame(countUp);
              }
            };
            
            // Start the label animation
            label.transition()
              .duration(800)
              .ease(d3.easeBounceOut)
              .attr("y", yScaleInd(d.percent))
              .style("opacity", 1)
              .on("start", () => {
                requestAnimationFrame(countUp);
              });
              
        }, 300 + i * 150); // Staggered start
      });
      } else {
        // Static positioning for print
        labels.attr("y", (d: any) => yScaleInd(d.percent));
      }

      // Enhanced axes with better styling
      const xAxisGroupInd = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
      xAxisGroupInd.selectAll("text")
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .style("font-size", "16px")
        .style("font-weight", "700")
        .style("text-shadow", isPrintTheme ? "none" : "0.5px 0.5px 1px rgba(255,255,255,0.8)")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
      xAxisGroupInd.selectAll(".domain, line").style("stroke", isPrintTheme ? "#000" : "#94A3B8").style("stroke-width", 1.5);
      
      const yAxisGroupInd = g.append("g")
        .call(d3.axisLeft(yScaleInd).ticks(4).tickFormat((d: any) => `${d}%`));
      yAxisGroupInd.selectAll("text")
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .style("font-size", "14px")
        .style("font-weight", "600");
      yAxisGroupInd.selectAll(".domain, line").style("stroke", isPrintTheme ? "#000" : "#94A3B8").style("stroke-width", 1.5);
      yAxisGroupInd.select(".domain").remove();

      // Axis labels
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", effectiveHeight + 200)  // Positioned within the expanded SVG area
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .text("Отрасль");
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(margin.top + height / 2))
        .attr("y", 18)
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .text("Уровень внедрения (%)");

      // Add subtle hover effects to bars (disabled for print)
      if (!isPrintTheme) {
        bars.on("mouseenter", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("filter", "drop-shadow(0 6px 12px rgba(0,0,0,0.3)) brightness(1.1)");
        })
        .on("mouseleave", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2)) brightness(1)");
        });
      }
    }

    return () => {
      if (industryAdoptionChartRef.current) {
        d3.select(industryAdoptionChartRef.current).selectAll("*").remove();
        industryAdoptionChartRef.current.removeAttribute('data-chart-initialized-s8-industry');
      }
    };
  }, [isPrintTheme]);

  return (
    <>
      <h3 className="chart-title-s8">Внедрение бенчмаркинга по отраслям</h3>
      <div className={styles.industryChart} ref={industryAdoptionChartRef}></div>
    </>
  );
}; 