import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './IndustryAdoptionBarChart.scss'; // Will be minimal or empty
import { industryData } from '../../data';

export const IndustryAdoptionBarChart: React.FC = () => {
  const industryAdoptionChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (industryAdoptionChartRef.current && !industryAdoptionChartRef.current.hasAttribute('data-chart-initialized-s8-industry')) {
      industryAdoptionChartRef.current.setAttribute('data-chart-initialized-s8-industry', 'true');
      const chartContainer = industryAdoptionChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <= 0 || containerHeight <= 0) { return; }
      
      const margin = { top: 20, right: 20, bottom: 65, left: 50 }; // Kept from original
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;
      
      const svg = d3.select(industryAdoptionChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);
      
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

      // Create gradient definitions for bars
      const defs = svg.append("defs");
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

      const bars = g.selectAll(".bar-industry")
        .data(industryData)
        .enter().append("rect")
        .attr("class", "bar-industry")
        .attr("x", d => xScale(d.shortName)!)
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", (d, i) => `url(#bar-gradient-${i})`)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
        .style("stroke", "#ffffff")
        .style("stroke-width", 1);

      // Enhanced elastic bar animation
      bars.transition()
        .duration(1400)
        .delay((_d, i) => i * 150)
        .ease(d3.easeElasticOut.amplitude(1).period(0.6))
        .attr("y", d => yScaleInd(d.percent))
        .attr("height", d => height - yScaleInd(d.percent))
        .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");

      // Enhanced labels with bigger, bolder text and counting animation
      const labels = g.selectAll(".label-industry")
        .data(industryData)
        .enter().append("text")
        .attr("class", "label-industry")
        .attr("x", d => xScale(d.shortName)! + xScale.bandwidth() / 2)
        .attr("y", height)
        .attr("text-anchor", "middle")
        .attr("dy", "-0.8em")
        .style("font-size", "16px") // Much bigger font
        .style("fill", "#1E293B")
        .style("font-weight", "800") // Extra bold
        .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
        .style("opacity", 0)
        .text("0%"); // Start with 0

      // Animated number counting effect
      labels.each(function(d, i) {
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

      // Enhanced axes with better styling
      const xAxisGroupInd = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
      xAxisGroupInd.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "12px")
        .style("font-weight", "700")
        .style("text-shadow", "0.5px 0.5px 1px rgba(255,255,255,0.8)")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
      xAxisGroupInd.selectAll(".domain, line").style("stroke", "#94A3B8").style("stroke-width", 1.5);
      
      const yAxisGroupInd = g.append("g")
        .call(d3.axisLeft(yScaleInd).ticks(4).tickFormat(d => `${d}%`));
      yAxisGroupInd.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "10px")
        .style("font-weight", "600");
      yAxisGroupInd.selectAll(".domain, line").style("stroke", "#94A3B8").style("stroke-width", 1.5);
      yAxisGroupInd.select(".domain").remove();

      // Axis labels
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", containerHeight - 5)
        .text("Отрасль");
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(margin.top + height / 2))
        .attr("y", 18)
        .text("Уровень внедрения (%)");

      // Add subtle hover effects to bars
      bars.on("mouseenter", function(event, d) {
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

    return () => {
      if (industryAdoptionChartRef.current) {
        d3.select(industryAdoptionChartRef.current).selectAll("*").remove();
        industryAdoptionChartRef.current.removeAttribute('data-chart-initialized-s8-industry');
      }
    };
  }, []);

  return (
    <>
      <h3 className="chart-title-s8">Внедрение бенчмаркинга по отраслям</h3>
      <div className="chart" ref={industryAdoptionChartRef}></div>
    </>
  );
}; 