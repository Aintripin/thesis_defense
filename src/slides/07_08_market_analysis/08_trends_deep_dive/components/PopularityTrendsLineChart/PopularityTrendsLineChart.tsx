import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './PopularityTrendsLineChart.module.scss';
import { popularityTrendsData, popularityChartCategories } from '../../data';

interface ChartProps {
  isPrintTheme: boolean;
}

export const PopularityTrendsLineChart: React.FC<ChartProps> = ({ isPrintTheme }) => {
  const popularityTrendsChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popularityTrendsChartRef.current && !popularityTrendsChartRef.current.hasAttribute('data-chart-initialized-s8-pop-trends')) {
      popularityTrendsChartRef.current.setAttribute('data-chart-initialized-s8-pop-trends', 'true');
      const chartContainer = popularityTrendsChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <= 0 || containerHeight <= 0) { return; }
      
      // Reserve space for legend by reducing effective height
      const legendReservedHeight = 35;
      const effectiveHeight = containerHeight - legendReservedHeight;
      
      const margin = { top: 20, right: 30, bottom: 40, left: 70 }; // Reduced bottom margin from 50 to 40 for more plot space
      const width = containerWidth - margin.left - margin.right;
      const height = effectiveHeight - margin.top - margin.bottom;
      
      const svg = d3.select(popularityTrendsChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", effectiveHeight + 25); // Add space for "год" label
      
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(popularityTrendsData, d => d.year) as [number, number])
        .range([0, width]);
      
      let maxYPop = 0;
      popularityChartCategories.forEach(cat => {
        const maxInCategory = d3.max(popularityTrendsData, d => (d as any)[cat.key]);
        if (maxInCategory && maxInCategory > maxYPop) maxYPop = maxInCategory;
      });
      maxYPop *= 1.05;
      const yScalePop = d3.scaleLinear().domain([0, maxYPop]).range([height, 0]);

      g.append("g").attr("class", "grid grid-s8")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(() => ""));
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScalePop).tickSize(-width).tickFormat(() => ""));

      const lineGenerator = d3.line<any>().x(d => xScale(d.year)).curve(d3.curveMonotoneX);

      popularityChartCategories.forEach((category, catIndex) => {
        const linePath = g.append("path")
          .datum(popularityTrendsData)
          .attr("class", "line-pop-trend")
          .attr("fill", "none")
          .attr("stroke", isPrintTheme ? '#000' : category.color)
          .attr("stroke-width", 2.5)
          .style("stroke-dasharray", isPrintTheme ? category.dash : "1,0")
          .attr("d", lineGenerator.y(d => yScalePop((d as any)[category.key])));

        if (!isPrintTheme) {
          linePath.style("opacity", 0);
          const totalLength = (linePath.node() as SVGPathElement)?.getTotalLength() || 0;
          linePath.attr("stroke-dasharray", `${totalLength} ${totalLength}`)
            .attr("stroke-dashoffset", totalLength)
            .transition().duration(1500).delay(catIndex * 200).ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .style("opacity", 1);
        }

        const points = g.selectAll(`.dot-pop-trend-${category.key}`)
          .data(popularityTrendsData)
          .enter().append("circle")
          .attr("class", `dot-pop-trend dot-pop-trend-${category.key}`)
          .attr("cx", d => xScale(d.year))
          .attr("cy", d => yScalePop((d as any)[category.key]))
          .attr("r", isPrintTheme ? 4 : 0)
          .style("fill", isPrintTheme ? "#fff" : category.color)
          .style("stroke", isPrintTheme ? "#000" : "white")
          .style("stroke-width", 1.5)
          .style("opacity", isPrintTheme ? 1 : 0);
        
        if (!isPrintTheme) {
          points.transition().duration(500).delay((_d, i) => (catIndex * 200) + (i * 100) + 500)
            .attr("r", 4)
            .style("opacity", 1);
        }
      });

      const xAxisGroupPop = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
      xAxisGroupPop.selectAll("text").style("fill", isPrintTheme ? "#000" : "#475569").style("font-size", "14px");
      xAxisGroupPop.selectAll(".domain, line").style("stroke", isPrintTheme ? "#000" : "#AEB8C4");
      
      const yAxisGroupPop = g.append("g")
        .call(d3.axisLeft(yScalePop).ticks(5).tickFormat(d => `${d}%`));
      yAxisGroupPop.selectAll("text").style("fill", isPrintTheme ? "#000" : "#475569").style("font-size", "14px");
      yAxisGroupPop.selectAll(".domain, line").style("stroke", isPrintTheme ? "#000" : "#AEB8C4");

      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", effectiveHeight + 20)
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .text("Год");
      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(margin.top + height / 2))
        .attr("y", 15)
        .style("fill", isPrintTheme ? "#000" : "#475569")
        .text("Индекс популярности (%)");
    }

    return () => {
      if (popularityTrendsChartRef.current) {
        d3.select(popularityTrendsChartRef.current).selectAll("*").remove();
        popularityTrendsChartRef.current.removeAttribute('data-chart-initialized-s8-pop-trends');
      }
    };
  }, [isPrintTheme]);

  // Helper function to create a data URI for an SVG dashed line
  const createSvgDashDataUri = (dash: string) => {
    // A wider SVG to better display the dash pattern
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="10"><line x1="0" y1="5" x2="30" y2="5" stroke="#000" stroke-width="3" stroke-dasharray="${dash}"/></svg>`;
    return `url("data:image/svg+xml;base64,${btoa(svgString)}")`;
  };

  return (
    <>
      <h3 className="chart-title-s8">Тренды популярности бенчмарков</h3>
      <div className={styles.chart} ref={popularityTrendsChartRef}></div>
      <div className={styles.legendS8Popularity}>
        {popularityChartCategories.map(cat => (
          <div key={cat.key} className={styles.legendItemS8}>
            <div 
              className={styles.legendColorS8} 
              style={
                isPrintTheme ? {
                  border: '1px solid #000',
                  backgroundColor: '#fff',
                  backgroundImage: createSvgDashDataUri(cat.dash),
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
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