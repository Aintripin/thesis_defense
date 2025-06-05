import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './RegionalTrendsAreaChart.scss';
import { regionTrendsData, regionalChartCategories } from '../../data';

export const RegionalTrendsAreaChart: React.FC = () => {
  const regionalTrendsChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (regionalTrendsChartRef.current && !regionalTrendsChartRef.current.hasAttribute('data-chart-initialized-s8-region-trends')) {
      regionalTrendsChartRef.current.setAttribute('data-chart-initialized-s8-region-trends', 'true');
      const chartContainer = regionalTrendsChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <= 0 || containerHeight <= 0) { return; }
      
      const margin = { top: 20, right: 30, bottom: 50, left: 50 }; 
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;
      
      const svg = d3.select(regionalTrendsChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);
      
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

      const areaGenerator = d3.area<any>()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveCardinal.tension(0.5));

      const areas = g.selectAll(".area-region")
        .data(stackedData)
        .enter().append("path")
        .attr("class", "area-region")
        .style("fill", (_d, i) => regionalChartCategories[i].color)
        .style("stroke", (_d, i) => d3.color(regionalChartCategories[i].color)?.darker(0.7).toString() || regionalChartCategories[i].color)
        .style("stroke-width", 1);

      areas.each(function(areaData, i) {
        const path = d3.select(this);
        const originalPathD = areaGenerator(areaData as any);
        const startArea = d3.area<any>().x(d => xScale(d.data.year)).y0(_ => yScale(0)).y1(_ => yScale(0)).curve(d3.curveCardinal.tension(0.5));
        path.attr("d", startArea(areaData as any));
        let progress = 0; const areaTotalDuration = 1500; const areaStartTime = Date.now() + (i * 200);
        function animateRise() {
          const now = Date.now(); if (now < areaStartTime) { requestAnimationFrame(animateRise); return; }
          const elapsed = now - areaStartTime; progress = Math.min(elapsed / areaTotalDuration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const risingArea = d3.area<any>().x(d => xScale(d.data.year))
            .y0(d => yScale(0) + (yScale(d[0]) - yScale(0)) * easeProgress)
            .y1(d => yScale(0) + (yScale(d[1]) - yScale(0)) * easeProgress)
            .curve(d3.curveCardinal.tension(0.5));
          path.attr("d", risingArea(areaData as any));
          if (progress < 1) { requestAnimationFrame(animateRise); } else { path.transition().duration(300).ease(d3.easeLinear).attr("d", originalPathD); }
        }
        requestAnimationFrame(animateRise);
      });

      const xAxisGroup = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
      xAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      xAxisGroup.selectAll(".domain").style("stroke", "#AEB8C4"); 
      xAxisGroup.selectAll("line").style("stroke", "#AEB8C4");
      
      const yAxisGroup = g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));
      yAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      yAxisGroup.selectAll(".domain").style("stroke", "#AEB8C4"); 
      yAxisGroup.selectAll("line").style("stroke", "#AEB8C4");

      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", containerHeight - 10)
        .text("Год");
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(margin.top + height / 2))
        .attr("y", 15)
        .text("Доля рынка (%)");
    }

    return () => {
      if (regionalTrendsChartRef.current) {
        d3.select(regionalTrendsChartRef.current).selectAll("*").remove();
        regionalTrendsChartRef.current.removeAttribute('data-chart-initialized-s8-region-trends');
      }
    };
  }, []);

  return (
    <>
      <h3 className="chart-title-s8">Прогноз роста внедрения по регионам</h3>
      <div className="chart" ref={regionalTrendsChartRef}></div>
      <div className="legend-s8-regional">
        {regionalChartCategories.map(cat => (
          <div key={cat.key} className="legend-item-s8">
            <div className="legend-color-s8" style={{ backgroundColor: cat.color }}></div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}; 