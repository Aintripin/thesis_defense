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

      // Gridlines (using .grid-s8 class from parent slide SCSS)
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScaleInd).tickSize(-width).ticks(4).tickFormat(() => ""));
      g.selectAll(".grid .domain").remove(); // Remove domain line from grid axis

      const bars = g.selectAll(".bar-industry")
        .data(industryData)
        .enter().append("rect")
        .attr("class", "bar-industry")
        .attr("x", d => xScale(d.shortName)!)
        .attr("y", height) // Start from bottom for animation
        .attr("width", xScale.bandwidth())
        .attr("height", 0) // Start with no height for animation
        .attr("fill", d => d.color || "#3B82F6")
        .attr("rx", 3) 
        .attr("ry", 3);

      bars.transition().duration(1000).delay((_d, i) => i * 100)
        .attr("y", d => yScaleInd(d.percent))
        .attr("height", d => height - yScaleInd(d.percent));

      const labels = g.selectAll(".label-industry")
        .data(industryData)
        .enter().append("text")
        .attr("class", "label-industry")
        .attr("x", d => xScale(d.shortName)! + xScale.bandwidth() / 2)
        .attr("y", height) // Start from bottom for animation
        .attr("text-anchor", "middle")
        .attr("dy", "-0.5em")
        .style("font-size", "10px")
        .style("fill", "#334155")
        .style("font-weight", "500")
        .style("opacity", 0)
        .text(d => `${d.percent}%`);

      labels.transition().duration(1000).delay((_d, i) => 200 + i * 100)
        .attr("y", d => yScaleInd(d.percent))
        .style("opacity", 1);

      const xAxisGroupInd = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
      xAxisGroupInd.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "9px")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
      xAxisGroupInd.selectAll(".domain, line").style("stroke", "#AEB8C4");
      
      const yAxisGroupInd = g.append("g")
        .call(d3.axisLeft(yScaleInd).ticks(4).tickFormat(d => `${d}%`));
      yAxisGroupInd.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      yAxisGroupInd.selectAll(".domain, line").style("stroke", "#AEB8C4");
      yAxisGroupInd.select(".domain").remove(); // Remove Y axis domain line for cleaner look if grid is present

      // Axis labels (using .axis-label-s8 class from parent slide SCSS)
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", containerHeight - 5) // Adjusted based on original
        .text("Отрасль");
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(margin.top + height / 2))
        .attr("y", 18) // Adjusted based on original (was 15 then 18)
        .text("Уровень внедрения (%)");
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