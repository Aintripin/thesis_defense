import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './MarketShareDonutChart.scss';
import { benchmarkTypesData } from '../../data';

export const MarketShareDonutChart: React.FC = () => {
  const marketShareChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marketShareChartRef.current && !marketShareChartRef.current.hasAttribute('data-chart-initialized-s8-donut')) {
      marketShareChartRef.current.setAttribute('data-chart-initialized-s8-donut', 'true');
      const chartContainer = marketShareChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <=0 || containerHeight <= 0) { return; }
      const margin = { top: 5, right: 5, bottom: 5, left: 5 }; // Reduced margins
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select(marketShareChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${containerHeight / 2})`);

      const pie = d3.pie<any>().value((d: any) => d.value).sort(null);
      const arc = d3.arc<any, d3.PieArcDatum<any>>().innerRadius(radius * 0.55).outerRadius(radius * 0.98); // Increased outer radius multiplier

      const arcs = svg.selectAll(".arc")
        .data(pie(benchmarkTypesData))
        .enter().append("g")
        .attr("class", "arc");

      arcs.append("path")
        .attr("d", arc)
        .style("fill", (d: any) => d.data.color)
        .style("stroke", "#ffffff")
        .style("stroke-width", 2)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((_d: any, i: number) => i * 150)
        .style("opacity", 1)
        .attrTween("d", function(d: any) {
          const i = d3.interpolate(d.startAngle, d.endAngle);
          return function(t: any) { 
            d.endAngle = i(t); 
            const pathData = arc(d);
            return pathData === null ? "" : pathData; 
          };
        });

      arcs.append("text")
        .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", radius < 60 ? "10px" : "12px")
        .style("fill", "#ffffff")
        .style("opacity", 0)
        .text((d: any) => `${d.data.value}%`)
        .transition()
        .duration(800)
        .delay((_d: any, i: number) => 500 + i * 150)
        .style("opacity", 1);
    }

    return () => {
      if (marketShareChartRef.current) {
        d3.select(marketShareChartRef.current).selectAll("*").remove();
        marketShareChartRef.current.removeAttribute('data-chart-initialized-s8-donut');
      }
    };
  }, []);

  return (
    <div className="donut-internal-wrapper">
      <div className="chart sidebar-donut-chart-s8" ref={marketShareChartRef}></div>
      <div className="legend-s8-donut">
        {benchmarkTypesData.map(item => (
          <div key={item.type} className="legend-item-s8">
            <div className="legend-color-s8" style={{ backgroundColor: item.color }}></div>
            <span>{item.type} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 