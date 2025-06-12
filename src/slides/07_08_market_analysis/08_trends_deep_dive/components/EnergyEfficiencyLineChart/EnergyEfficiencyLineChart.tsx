import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './EnergyEfficiencyLineChart.module.scss';
import { energyEfficiencyRawData, energyChartCategories } from '../../data';

export const EnergyEfficiencyLineChart: React.FC = () => {
  const energyEfficiencyChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (energyEfficiencyChartRef.current && !energyEfficiencyChartRef.current.hasAttribute('data-chart-initialized-s8-energy')) {
      energyEfficiencyChartRef.current.setAttribute('data-chart-initialized-s8-energy', 'true');
      const chartContainer = energyEfficiencyChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      if (containerWidth <= 0 || containerHeight <= 0) { return; }
      
      // Reserve space for legend by reducing effective height
      const legendReservedHeight = 25; // Reduced from 35 to compensate for expanded SVG
      const effectiveHeight = containerHeight - legendReservedHeight;
      
      const margin = { top: 20, right: 30, bottom: 40, left: 70 }; // Reduced bottom margin from 50 to 40 for more plot space
      const width = containerWidth - margin.left - margin.right;
      const height = effectiveHeight - margin.top - margin.bottom + 25; // Use effectiveHeight
      
      const svg = d3.select(energyEfficiencyChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", effectiveHeight + 30); // Add 30px to accommodate the "год" label at +25
      
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      
      const xScale = d3.scaleLinear().domain([2023, 2025]).range([0, width]);
      
      let maxYEnergy = 0;
      energyChartCategories.forEach(cat => {
        const seriesData = energyEfficiencyRawData.filter(d => d.DBMS_Type === cat.dbms && d.Deployment_Model === cat.deploy);
        const maxInCategory = d3.max(seriesData, d => d.CostPer1k);
        if (maxInCategory && maxInCategory > maxYEnergy) maxYEnergy = maxInCategory;
      });
      maxYEnergy = maxYEnergy > 0 ? maxYEnergy * 1.1 : 0.05;
      const yScaleEnergy = d3.scaleLinear().domain([0, maxYEnergy]).range([height, 0]);

      g.append("g").attr("class", "grid grid-s8")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(3).tickFormat(() => "").tickSize(-height));
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScaleEnergy).ticks(4).tickFormat(() => "").tickSize(-width));
      g.selectAll(".grid .domain").remove();

      const lineGeneratorEnergy = d3.line<{ Year: number, CostPer1k: number }>()
        .x(d => xScale(d.Year))
        .y(d => yScaleEnergy(d.CostPer1k))
        .curve(d3.curveMonotoneX);

      energyChartCategories.forEach((category, catIndex) => {
        const seriesData = energyEfficiencyRawData
          .filter(d => d.DBMS_Type === category.dbms && d.Deployment_Model === category.deploy)
          .map(d => ({ Year: d.Year, CostPer1k: d.CostPer1k }))
          .sort((a, b) => a.Year - b.Year);
        
        if (seriesData.length === 0) return;

        const linePath = g.append("path")
          .datum(seriesData)
          .attr("fill", "none")
          .attr("stroke", category.color)
          .attr("stroke-width", 2.5)
          .attr("d", lineGeneratorEnergy)
          .style("opacity", 0);
        
        const totalLength = (linePath.node() as SVGPathElement)?.getTotalLength() || 0;
        linePath.attr("stroke-dasharray", `${totalLength} ${totalLength}`)
          .attr("stroke-dashoffset", totalLength)
          .transition().duration(1500).delay(catIndex * 150).ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .style("opacity", 1);

        g.selectAll(`.dot-energy-${category.key}`)
          .data(seriesData)
          .enter().append("circle")
          .attr("class", `dot-energy dot-energy-${category.key}`)
          .attr("cx", d => xScale(d.Year))
          .attr("cy", d => yScaleEnergy(d.CostPer1k))
          .attr("r", 0)
          .style("fill", category.color)
          .style("stroke", "white")
          .style("stroke-width", 1.5)
          .transition().duration(500).delay((_d, i) => (catIndex * 150) + (i * 100) + 500)
          .attr("r", 4)
          .style("opacity", 1);
      });

      const xAxisGroupEnergy = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(3).tickFormat(d3.format("d")));
      xAxisGroupEnergy.selectAll("text").style("fill", "#475569").style("font-size", "14px");
      xAxisGroupEnergy.selectAll(".domain, line").style("stroke", "#AEB8C4");
      
      const yAxisGroupEnergy = g.append("g")
        .call(d3.axisLeft(yScaleEnergy).ticks(4).tickFormat(d => `$${Number(d).toFixed(3)}`));
      yAxisGroupEnergy.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "14px")
        .attr("dx", "-4px");
      yAxisGroupEnergy.selectAll(".domain, line").style("stroke", "#AEB8C4");

      svg.append("text").attr("class", "axis-label-s8")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", effectiveHeight + 25)  // Moved up from +18 to +12 since we reduced bottom margin
        .text("Год");
      
      // Y-axis label will be handled as separate HTML element outside SVG
    }

    return () => {
      if (energyEfficiencyChartRef.current) {
        d3.select(energyEfficiencyChartRef.current).selectAll("*").remove();
        energyEfficiencyChartRef.current.removeAttribute('data-chart-initialized-s8-energy');
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
      <h3 className="chart-title-s8">Энергоэффективность и стоимость транзакций СУБД (2023-2025)</h3>
      
      {/* Flexbox container for Y-axis label and chart */}
      <div style={{ display: 'flex', alignItems: 'stretch', flex: 1, margin: 0, padding: 0 }}>
        {/* Y-axis label */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2em',
            fontWeight: '600',
            color: '#475569',
            fontFamily: 'ALS Sector Regular, sans-serif',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            minWidth: '25px',
            margin: 0,
            padding: 0
          }}
        >
          Стоимость / 1000 транзакций (USD)
        </div>
        
        {/* Chart area */}
        <div className={styles.chart} ref={energyEfficiencyChartRef} style={{ flex: 1, margin: 0, padding: 0 }}></div>
      </div>
      
      <div className={styles.legendS8Energy}>
        {energyChartCategories.map(cat => (
          <div key={cat.key} className={styles.legendItemS8}>
            <div className={styles.legendColorS8} style={{ backgroundColor: cat.color }}></div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 