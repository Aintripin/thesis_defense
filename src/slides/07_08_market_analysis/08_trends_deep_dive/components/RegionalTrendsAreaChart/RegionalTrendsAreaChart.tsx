import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './RegionalTrendsAreaChart.scss';
import { regionTrendsData, regionalChartCategories } from '../../data';

export const RegionalTrendsAreaChart: React.FC = () => {
  const regionalTrendsChartRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

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
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
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