import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import './MarketAnalysisContinuedSlide.scss';

// Data for Sidebar Donut Chart
const benchmarkTypesData = [
  { type: "TPC стандарты", value: 42, color: "#1E3A8A" },
  { type: "Open Source (YCSB)", value: 31, color: "#3B82F6" },
  { type: "Вендорские", value: 18, color: "#60A5FA" },
  { type: "Внутренние", value: 9, color: "#93C5FD" },
];

const regionTrendsData = [
  { year: 2024, northAmerica: 42, europe: 28, asiaPacific: 22, latinAmerica: 5, middleEast: 3 },
  { year: 2025, northAmerica: 44, europe: 29, asiaPacific: 24, latinAmerica: 5.5, middleEast: 3.5 },
  { year: 2026, northAmerica: 45, europe: 30, asiaPacific: 27, latinAmerica: 6, middleEast: 4 },
  { year: 2027, northAmerica: 46, europe: 31, asiaPacific: 30, latinAmerica: 6.5, middleEast: 4.5 },
  { year: 2028, northAmerica: 47, europe: 32, asiaPacific: 33, latinAmerica: 7, middleEast: 5 },
  { year: 2029, northAmerica: 48, europe: 33, asiaPacific: 36, latinAmerica: 7.5, middleEast: 5.5 },
  { year: 2030, northAmerica: 49, europe: 34, asiaPacific: 39, latinAmerica: 8, middleEast: 6 },
];

const popularityTrendsData = [
  { year: 2018, ycsb: 14, tpcC: 35, tpcH: 28, hammerdb: 8, sysbench: 6, other: 9 },
  { year: 2019, ycsb: 16, tpcC: 33, tpcH: 27, hammerdb: 9, sysbench: 6, other: 9 },
  { year: 2020, ycsb: 19, tpcC: 30, tpcH: 26, hammerdb: 10, sysbench: 6, other: 9 },
  { year: 2021, ycsb: 22, tpcC: 28, tpcH: 25, hammerdb: 11, sysbench: 5, other: 9 },
  { year: 2022, ycsb: 25, tpcC: 26, tpcH: 23, hammerdb: 12, sysbench: 5, other: 9 },
  { year: 2023, ycsb: 28, tpcC: 24, tpcH: 21, hammerdb: 13, sysbench: 5, other: 9 },
  { year: 2024, ycsb: 31, tpcC: 22, tpcH: 19, hammerdb: 14, sysbench: 5, other: 9 },
];

const industryData = [
  { industry: "Финансы", percent: 78, shortName: "Финансы", color: "#1E67A8" },
  { industry: "ИТ и Телеком", percent: 72, shortName: "ИТ", color: "#2980B9" },
  { industry: "E-Commerce", percent: 67, shortName: "E-Com", color: "#3498DB" },
  { industry: "Здравоохранение", percent: 53, shortName: "Здрав-е", color: "#5DADE2" },
  { industry: "Производство", percent: 42, shortName: "Произв-о", color: "#85C1E9" },
  { industry: "Государство", percent: 38, shortName: "Гос-во", color: "#AED6F1" },
  { industry: "Транспорт", percent: 35, shortName: "Трансп.", color: "#CDE5F7" }, // Softer colors for bar chart
  { industry: "Образование", percent: 29, shortName: "Образ-е", color: "#D6EAF8" },
]; // Shortened for brevity, can add more from reference if needed, also added example colors

const keyMetricsData = [
  { icon: "💰", value: "292.22B", label: "USD к 2030" },
  { icon: "📈", value: "+14.21%", label: "CAGR" },
  { icon: "🚀", value: "6x", label: "NoSQL рост" },
  { icon: "☁️", value: "5.4x", label: "Облачные" },
];

const keyInsightsData = [
  { number: "31%", text: "YCSB опережает TPC-H по популярности для новых проектов" },
  { number: "2022", text: "Год признан точкой смены парадигм в пользу NoSQL и облаков" },
  { number: "+77%", text: "Азиатско-Тихоокеанский регион показывает самый быстрый рост внедрения" },
  { number: "78%", text: "Финансовый сектор лидирует по глубине использования бенчмаркинга" },
  // { number: "6x", text: "Рост NoSQL к 2030" }, // This seems redundant with keyMetricsData
];

const regionalChartCategories = [
  { key: "northAmerica", name: "Сев. Америка", color: "#2563EB" }, // Blue
  { key: "europe", name: "Европа", color: "#3B82F6" }, // Lighter Blue
  { key: "asiaPacific", name: "Азия-Тихоокеания", color: "#60A5FA" }, // Even Lighter Blue
  { key: "latinAmerica", name: "Лат. Америка", color: "#93C5FD" }, // Lightest Blue
  { key: "middleEast", name: "Бл. Восток", color: "#BFDBFE" }  // Very Light Blue
];

const popularityChartCategories = [
  { key: "ycsb", name: "YCSB", color: "#EF4444" }, // Red
  { key: "tpcC", name: "TPC-C", color: "#3B82F6" }, // Blue
  { key: "tpcH", name: "TPC-H", color: "#10B981" }, // Green
  { key: "hammerdb", name: "HammerDB", color: "#F59E0B" } // Amber
];

const energyEfficiencyRawData = [
  // Data from energy_cost_efficiency_dbms.csv, parsed into an array of objects
  // Year,DBMS_Type,Deployment_Model,Transactions_Per_Second,Avg_Energy_Consumption_Watts,Energy_Per_1000_Transactions_Wh,Cost_Per_1000_Transactions_USD
  { Year: 2023, DBMS_Type: "Relational", Deployment_Model: "On-Premise", TPS: 25000, Watts: 450, EnergyPer1k: 18.0, CostPer1k: 0.022 },
  { Year: 2023, DBMS_Type: "Relational", Deployment_Model: "Cloud", TPS: 24000, Watts: 500, EnergyPer1k: 20.8, CostPer1k: 0.030 },
  { Year: 2023, DBMS_Type: "NoSQL", Deployment_Model: "On-Premise", TPS: 30000, Watts: 420, EnergyPer1k: 14.0, CostPer1k: 0.018 },
  { Year: 2023, DBMS_Type: "NoSQL", Deployment_Model: "Cloud", TPS: 29000, Watts: 460, EnergyPer1k: 15.9, CostPer1k: 0.025 },
  { Year: 2023, DBMS_Type: "Graph", Deployment_Model: "On-Premise", TPS: 15000, Watts: 350, EnergyPer1k: 23.3, CostPer1k: 0.028 },
  { Year: 2023, DBMS_Type: "Graph", Deployment_Model: "Cloud", TPS: 14000, Watts: 390, EnergyPer1k: 27.9, CostPer1k: 0.035 },
  { Year: 2023, DBMS_Type: "Cloud-Native", Deployment_Model: "Cloud", TPS: 33000, Watts: 400, EnergyPer1k: 12.1, CostPer1k: 0.015 },

  { Year: 2024, DBMS_Type: "Relational", Deployment_Model: "On-Premise", TPS: 26000, Watts: 440, EnergyPer1k: 16.9, CostPer1k: 0.021 },
  { Year: 2024, DBMS_Type: "Relational", Deployment_Model: "Cloud", TPS: 25000, Watts: 480, EnergyPer1k: 19.2, CostPer1k: 0.028 },
  { Year: 2024, DBMS_Type: "NoSQL", Deployment_Model: "On-Premise", TPS: 31500, Watts: 410, EnergyPer1k: 13.0, CostPer1k: 0.017 },
  { Year: 2024, DBMS_Type: "NoSQL", Deployment_Model: "Cloud", TPS: 30500, Watts: 445, EnergyPer1k: 14.6, CostPer1k: 0.023 },
  { Year: 2024, DBMS_Type: "Graph", Deployment_Model: "On-Premise", TPS: 16000, Watts: 340, EnergyPer1k: 21.3, CostPer1k: 0.026 },
  { Year: 2024, DBMS_Type: "Graph", Deployment_Model: "Cloud", TPS: 15000, Watts: 370, EnergyPer1k: 24.7, CostPer1k: 0.033 },
  { Year: 2024, DBMS_Type: "Cloud-Native", Deployment_Model: "Cloud", TPS: 35000, Watts: 390, EnergyPer1k: 11.1, CostPer1k: 0.014 },

  { Year: 2025, DBMS_Type: "Relational", Deployment_Model: "On-Premise", TPS: 27000, Watts: 430, EnergyPer1k: 15.9, CostPer1k: 0.019 },
  { Year: 2025, DBMS_Type: "Relational", Deployment_Model: "Cloud", TPS: 26000, Watts: 470, EnergyPer1k: 18.1, CostPer1k: 0.026 },
  { Year: 2025, DBMS_Type: "NoSQL", Deployment_Model: "On-Premise", TPS: 33000, Watts: 400, EnergyPer1k: 12.1, CostPer1k: 0.016 },
  { Year: 2025, DBMS_Type: "NoSQL", Deployment_Model: "Cloud", TPS: 32000, Watts: 430, EnergyPer1k: 13.4, CostPer1k: 0.021 },
  { Year: 2025, DBMS_Type: "Graph", Deployment_Model: "On-Premise", TPS: 17000, Watts: 330, EnergyPer1k: 19.4, CostPer1k: 0.024 },
  { Year: 2025, DBMS_Type: "Graph", Deployment_Model: "Cloud", TPS: 16000, Watts: 355, EnergyPer1k: 22.2, CostPer1k: 0.030 },
  { Year: 2025, DBMS_Type: "Cloud-Native", Deployment_Model: "Cloud", TPS: 37000, Watts: 375, EnergyPer1k: 10.1, CostPer1k: 0.012 },
];

const energyChartCategories = [
  { dbms: "Relational", deploy: "On-Premise", name: "Relational (On-Prem)", color: "#A855F7", key: "Relational_On-Premise" }, // Purple
  { dbms: "Relational", deploy: "Cloud", name: "Relational (Cloud)", color: "#D8B4FE", key: "Relational_Cloud" },   // Light Purple
  { dbms: "NoSQL", deploy: "On-Premise", name: "NoSQL (On-Prem)", color: "#22C55E", key: "NoSQL_On-Premise" },        // Green
  { dbms: "NoSQL", deploy: "Cloud", name: "NoSQL (Cloud)", color: "#86EFAC", key: "NoSQL_Cloud" },          // Light Green
  { dbms: "Graph", deploy: "On-Premise", name: "Graph (On-Prem)", color: "#F97316", key: "Graph_On-Premise" },      // Orange
  { dbms: "Graph", deploy: "Cloud", name: "Graph (Cloud)", color: "#FDBA74", key: "Graph_Cloud" },        // Light Orange
  { dbms: "Cloud-Native", deploy: "Cloud", name: "Cloud-Native", color: "#0EA5E9", key: "Cloud-Native_Cloud" } // Sky Blue
];

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  variant: 'metrics' | 'trends' | 'insights' | 'donuts';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, children, delay = 0, variant }) => (
  <motion.div
    className={`glass-card ${variant}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="card-title">{title}</div>
    {children}
  </motion.div>
);

export const MarketAnalysisContinuedSlide: React.FC = () => {
  const regionalTrendsChartRef = useRef<HTMLDivElement>(null);
  const popularityTrendsChartRef = useRef<HTMLDivElement>(null);
  const industryAdoptionChartRef = useRef<HTMLDivElement>(null);
  const marketShareChartRef = useRef<HTMLDivElement>(null);
  const energyEfficiencyChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sidebar Donut Chart ("Рыночная доля")
    if (marketShareChartRef.current && !marketShareChartRef.current.hasAttribute('data-chart-initialized-s8-donut')) {
      marketShareChartRef.current.setAttribute('data-chart-initialized-s8-donut', 'true');
      console.log("[MarketAnalysisContinuedSlide] Initializing Donut Chart...");

      const chartContainer = marketShareChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;
      
      if (containerWidth <=0 || containerHeight <= 0) {
        console.warn("[MarketAnalysisContinuedSlide Donut] Chart dimensions invalid.", { containerWidth, containerHeight});
        return;
      }

      const margin = { top: 10, right: 10, bottom: 10, left: 10 };
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select(marketShareChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${containerHeight / 2})`);

      const pie = d3.pie<any>().value(d => d.value).sort(null);
      const arc = d3.arc<any, d3.PieArcDatum<any>>()
        .innerRadius(radius * 0.55)
        .outerRadius(radius * 0.9);

      const arcs = svg.selectAll(".arc")
        .data(pie(benchmarkTypesData))
        .enter().append("g")
        .attr("class", "arc");

      arcs.append("path")
        .attr("d", arc)
        .style("fill", d => d.data.color)
        .style("stroke", "#ffffff")
        .style("stroke-width", 2)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((_d, i) => i * 150)
        .style("opacity", 1)
        .attrTween("d", function(d) {
          const i = d3.interpolate(d.startAngle, d.endAngle);
          return function(t) {
            d.endAngle = i(t);
            const pathData = arc(d);
            return pathData === null ? "" : pathData;
          };
        });

      // Add text labels (type and percentage)
      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", radius < 60 ? "10px" : "12px")
        .style("fill", "#ffffff")
        .style("opacity", 0)
        .text(d => `${d.data.value}%`)
        .transition()
        .duration(800)
        .delay((_d, i) => 500 + i * 150)
        .style("opacity", 1);
    }

    // Top-Left Stacked Area Chart ("Прогноз роста внедрения по регионам")
    if (regionalTrendsChartRef.current && !regionalTrendsChartRef.current.hasAttribute('data-chart-initialized-s8-region-trends')) {
      regionalTrendsChartRef.current.setAttribute('data-chart-initialized-s8-region-trends', 'true');
      console.log("[MarketAnalysisContinuedSlide] Initializing Regional Trends Stacked Area Chart...");

      const chartContainer = regionalTrendsChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;

      if (containerWidth <= 0 || containerHeight <= 0) {
        console.warn("[MarketAnalysisContinuedSlide RegionalTrends] Chart dimensions invalid.");
        return;
      }

      const margin = { top: 20, right: 30, bottom: 50, left: 50 }; // Adjusted margins for axis labels
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
        .domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])! * 1.05]) // Max of the top layer, with a bit of padding
        .range([height, 0]);

      // Gridlines
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

      // Animation like Slide 7
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

        const startArea = d3.area<any>()
          .x(d => xScale(d.data.year))
          .y0(_ => yScale(0))
          .y1(_ => yScale(0))
          .curve(d3.curveCardinal.tension(0.5));
        path.attr("d", startArea(areaData as any));

        let progress = 0;
        const areaTotalDuration = 1500; // Shorter duration for these smaller charts
        const areaStartTime = Date.now() + (i * 200); // Staggered start

        function animateRise() {
          const now = Date.now();
          if (now < areaStartTime) {
            requestAnimationFrame(animateRise);
            return;
          }
          const elapsed = now - areaStartTime;
          progress = Math.min(elapsed / areaTotalDuration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

          const risingArea = d3.area<any>()
            .x(d => xScale(d.data.year))
            .y0(d => yScale(0) + (yScale(d[0]) - yScale(0)) * easeProgress)
            .y1(d => yScale(0) + (yScale(d[1]) - yScale(0)) * easeProgress)
            .curve(d3.curveCardinal.tension(0.5));
        
          path.attr("d", risingArea(areaData as any));

          if (progress < 1) {
            requestAnimationFrame(animateRise);
          } else {
            // Optional: Settle animation (can be simpler than Slide 7)
            path.transition().duration(300).ease(d3.easeLinear).attr("d", originalPathD);
          }
        }
        requestAnimationFrame(animateRise);
      });

      // Axes
      const xAxisGroup = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
      
      xAxisGroup.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "10px");
      xAxisGroup.selectAll(".domain").style("stroke", "#AEB8C4"); // Style X axis line
      xAxisGroup.selectAll("line").style("stroke", "#AEB8C4"); // Style X axis ticks

      const yAxisGroup = g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`)); // Assuming y-values are percentages
      
      yAxisGroup.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "10px");
      yAxisGroup.selectAll(".domain").style("stroke", "#AEB8C4"); // Style Y axis line
      yAxisGroup.selectAll("line").style("stroke", "#AEB8C4"); // Style Y axis ticks

      // Axis Labels
      svg.append("text").attr("class", "axis-label-s8")
          .attr("text-anchor", "middle")
          .attr("x", margin.left + width / 2)
          .attr("y", containerHeight - 10)
          .text("Год");
      svg.append("text").attr("class", "axis-label-s8")
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .attr("x", -(margin.top + height / 2)) // Centering label for rotated text
          .attr("y", 15) // Position from the left edge of SVG (after rotation)
          .text("Доля рынка (%)");
    }

    // Top-Right Line Chart ("Тренды популярности бенчмарков")
    if (popularityTrendsChartRef.current && !popularityTrendsChartRef.current.hasAttribute('data-chart-initialized-s8-pop-trends')) {
      popularityTrendsChartRef.current.setAttribute('data-chart-initialized-s8-pop-trends', 'true');
      console.log("[MarketAnalysisContinuedSlide] Initializing Popularity Trends Line Chart...");

      const chartContainer = popularityTrendsChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;

      if (containerWidth <= 0 || containerHeight <= 0) {
        console.warn("[MarketAnalysisContinuedSlide PopTrends] Chart dimensions invalid.");
        return;
      }

      const margin = { top: 20, right: 30, bottom: 50, left: 50 };
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      const svg = d3.select(popularityTrendsChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(popularityTrendsData, d => d.year) as [number, number])
        .range([0, width]);

      // Determine max Y value across all selected categories for the y-scale
      let maxY = 0;
      popularityChartCategories.forEach(cat => {
        const maxInCategory = d3.max(popularityTrendsData, d => (d as any)[cat.key]);
        if (maxInCategory && maxInCategory > maxY) maxY = maxInCategory;
      });
      maxY *= 1.05; // Add some padding

      const yScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

      // Gridlines
      g.append("g").attr("class", "grid grid-s8")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(() => ""));
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(() => ""));

      // Line generator
      const lineGenerator = d3.line<any>()
        .x(d => xScale(d.year))
        .curve(d3.curveMonotoneX); // Smoothed line

      popularityChartCategories.forEach((category, catIndex) => {
        const linePath = g.append("path")
          .datum(popularityTrendsData)
          .attr("class", "line-pop-trend")
          .attr("fill", "none")
          .attr("stroke", category.color)
          .attr("stroke-width", 2.5)
          .attr("d", lineGenerator.y(d => yScale((d as any)[category.key])))
          .style("opacity", 0);
        
        const totalLength = (linePath.node() as SVGPathElement)?.getTotalLength() || 0;

        linePath
          .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(1500)
          .delay(catIndex * 200) // Stagger line animations
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .style("opacity", 1);

        // Circles for data points
        const points = g.selectAll(`.dot-pop-trend-${category.key}`)
          .data(popularityTrendsData)
          .enter().append("circle")
          .attr("class", `dot-pop-trend dot-pop-trend-${category.key}`)
          .attr("cx", d => xScale(d.year))
          .attr("cy", d => yScale((d as any)[category.key]))
          .attr("r", 0) // Start with radius 0
          .style("fill", category.color)
          .style("stroke", "white")
          .style("stroke-width", 1.5);

        points.transition()
          .duration(500)
          .delay((_d, i) => (catIndex * 200) + (i * 100) + 500) // Stagger point appearance
          .attr("r", 4) // Animate to final radius
          .style("opacity", 1);
      });

      // Axes
      const xAxisGroup = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
      xAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      xAxisGroup.selectAll(".domain, line").style("stroke", "#AEB8C4");

      const yAxisGroup = g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));
      yAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      yAxisGroup.selectAll(".domain, line").style("stroke", "#AEB8C4");

      // Axis Labels
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
          .text("Индекс популярности (%)");
    }

    // Bottom-Right Bar Chart ("Внедрение бенчмаркинга по отраслям")
    if (industryAdoptionChartRef.current && !industryAdoptionChartRef.current.hasAttribute('data-chart-initialized-s8-industry')) {
      industryAdoptionChartRef.current.setAttribute('data-chart-initialized-s8-industry', 'true');
      console.log("[MarketAnalysisContinuedSlide] Initializing Industry Adoption Bar Chart...");

      const chartContainer = industryAdoptionChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;

      if (containerWidth <= 0 || containerHeight <= 0) {
        console.warn("[MarketAnalysisContinuedSlide IndustryAdopt] Chart dimensions invalid.");
        return;
      }

      const margin = { top: 20, right: 20, bottom: 65, left: 50 }; // Increased bottom margin for rotated labels
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      const svg = d3.select(industryAdoptionChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleBand()
        .domain(industryData.map(d => d.shortName))
        .range([0, width])
        .padding(0.2); // Padding between bars

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(industryData, d => d.percent)! * 1.05]) // Max percent with padding
        .range([height, 0]);

      // Gridlines (horizontal only for bar chart is common)
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScale).tickSize(-width).ticks(5).tickFormat(d => `${d}%`));
      g.selectAll(".grid .domain").remove(); // Remove y-axis domain line for cleaner grid

      // Bars
      const bars = g.selectAll(".bar-industry")
        .data(industryData)
        .enter().append("rect")
        .attr("class", "bar-industry")
        .attr("x", d => xScale(d.shortName)!)
        .attr("y", height) // Start from bottom for animation
        .attr("width", xScale.bandwidth())
        .attr("height", 0) // Start with height 0 for animation
        .attr("fill", d => d.color || "#3B82F6") // Use defined color or a default
        .attr("rx", 3) // Rounded corners for bars
        .attr("ry", 3);

      bars.transition()
        .duration(1000)
        .delay((_d, i) => i * 100)
        .attr("y", d => yScale(d.percent))
        .attr("height", d => height - yScale(d.percent));

      // Text labels on bars
      const labels = g.selectAll(".label-industry")
        .data(industryData)
        .enter().append("text")
        .attr("class", "label-industry")
        .attr("x", d => xScale(d.shortName)! + xScale.bandwidth() / 2)
        .attr("y", height) // Start from bottom for animation
        .attr("text-anchor", "middle")
        .attr("dy", "-0.5em") // Position slightly above the bar
        .style("font-size", "10px")
        .style("fill", "#334155")
        .style("font-weight", "500")
        .style("opacity", 0)
        .text(d => `${d.percent}%`);

      labels.transition()
        .duration(1000)
        .delay((_d, i) => 200 + i * 100) // Delay after bars start animating
        .attr("y", d => yScale(d.percent))
        .style("opacity", 1);

      // Axes
      const xAxisGroup = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
      
      xAxisGroup.selectAll("text")
        .style("fill", "#475569")
        .style("font-size", "9px") // Smaller font for potentially many categories
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
      xAxisGroup.selectAll(".domain, line").style("stroke", "#AEB8C4");

      const yAxisGroup = g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));
      yAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      yAxisGroup.selectAll(".domain, line").style("stroke", "#AEB8C4");
      yAxisGroup.select(".domain").remove(); // Remove y-axis line, keep ticks for grid

      // Axis Labels
      svg.append("text").attr("class", "axis-label-s8")
          .attr("text-anchor", "middle")
          .attr("x", margin.left + width / 2)
          .attr("y", containerHeight - 5) // Adjusted for rotated x-axis labels
          .text("Отрасль");
      svg.append("text").attr("class", "axis-label-s8")
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .attr("x", -(margin.top + height / 2))
          .attr("y", 15)
          .text("Уровень внедрения (%)");
    }

    // NEW: Energy Efficiency Line Chart (Cell 3 - Bottom-Left)
    if (energyEfficiencyChartRef.current && !energyEfficiencyChartRef.current.hasAttribute('data-chart-initialized-s8-energy')) {
      energyEfficiencyChartRef.current.setAttribute('data-chart-initialized-s8-energy', 'true');
      console.log("[MarketAnalysisContinuedSlide] Initializing Energy Efficiency Line Chart...");

      const chartContainer = energyEfficiencyChartRef.current;
      const containerWidth = chartContainer.offsetWidth;
      const containerHeight = chartContainer.offsetHeight;

      if (containerWidth <= 0 || containerHeight <= 0) {
        console.warn("[MarketAnalysisContinuedSlide EnergyChart] Chart dimensions invalid.");
        return;
      }

      const margin = { top: 20, right: 30, bottom: 50, left: 60 }; // Adjusted left margin for USD values
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      const svg = d3.select(energyEfficiencyChartRef.current).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain([2023, 2025]) // Fixed domain for years
        .range([0, width]);

      let maxY = 0;
      energyChartCategories.forEach(cat => {
        const seriesData = energyEfficiencyRawData.filter(d => d.DBMS_Type === cat.dbms && d.Deployment_Model === cat.deploy);
        const maxInCategory = d3.max(seriesData, d => d.CostPer1k);
        if (maxInCategory && maxInCategory > maxY) maxY = maxInCategory;
      });
      maxY = maxY > 0 ? maxY * 1.1 : 0.05; // Add padding, ensure non-zero for empty data

      const yScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

      // Gridlines
      g.append("g").attr("class", "grid grid-s8")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(3).tickFormat(d3.format("d")).tickSize(-height));
      g.append("g").attr("class", "grid grid-s8")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${Number(d).toFixed(3)}`).tickSize(-width));
      g.selectAll(".grid .domain").remove();

      const lineGenerator = d3.line<{ Year: number, CostPer1k: number }>()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.CostPer1k))
        .curve(d3.curveMonotoneX);

      energyChartCategories.forEach((category, catIndex) => {
        const seriesData = energyEfficiencyRawData
          .filter(d => d.DBMS_Type === category.dbms && d.Deployment_Model === category.deploy)
          .map(d => ({ Year: d.Year, CostPer1k: d.CostPer1k }))
          .sort((a, b) => a.Year - b.Year);

        if (seriesData.length === 0) return; // Skip if no data for this category combination

        const linePath = g.append("path")
          .datum(seriesData)
          .attr("fill", "none")
          .attr("stroke", category.color)
          .attr("stroke-width", 2.5)
          .attr("d", lineGenerator)
          .style("opacity", 0);
        
        const totalLength = (linePath.node() as SVGPathElement)?.getTotalLength() || 0;
        linePath
          .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
          .attr("stroke-dashoffset", totalLength)
          .transition().duration(1500).delay(catIndex * 150).ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0).style("opacity", 1);

        g.selectAll(`.dot-energy-${category.key}`)
          .data(seriesData)
          .enter().append("circle")
          .attr("class", `dot-energy dot-energy-${category.key}`)
          .attr("cx", d => xScale(d.Year))
          .attr("cy", d => yScale(d.CostPer1k))
          .attr("r", 0).style("fill", category.color).style("stroke", "white").style("stroke-width", 1.5)
          .transition().duration(500).delay((_d, i) => (catIndex * 150) + (i * 100) + 500)
          .attr("r", 4).style("opacity", 1);
      });

      // Axes
      const xAxisGroup = g.append("g").attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(3).tickFormat(d3.format("d")));
      xAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      xAxisGroup.selectAll(".domain, line").style("stroke", "#AEB8C4");

      const yAxisGroup = g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${Number(d).toFixed(3)}`));
      yAxisGroup.selectAll("text").style("fill", "#475569").style("font-size", "10px");
      yAxisGroup.selectAll(".domain, line").style("stroke", "#AEB8C4");

      // Axis Labels
      svg.append("text").attr("class", "axis-label-s8")
          .attr("text-anchor", "middle").attr("x", margin.left + width / 2).attr("y", containerHeight - 10).text("Год");
      svg.append("text").attr("class", "axis-label-s8")
          .attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -(margin.top + height / 2)).attr("y", 18).text("Стоимость / 1000 транзакций (USD)");
    }

    return () => {
      // Clean up all chart containers on component unmount
      const chartRefs = [
        marketShareChartRef,
        regionalTrendsChartRef,
        popularityTrendsChartRef,
        industryAdoptionChartRef,
        energyEfficiencyChartRef
      ];
      chartRefs.forEach(ref => {
        if (ref.current) {
          d3.select(ref.current).selectAll("*").remove();
          // Remove initialization attributes if any were missed in specific cleanup logic
          const attrs = ref.current.getAttributeNames();
          attrs.forEach(attr => {
            if (attr.startsWith('data-chart-initialized-s8')) {
              ref.current?.removeAttribute(attr);
            }
          });
        }
      });
    };
  }, []);

  return (
    <div className="market-analysis-continued-slide">
      <motion.div
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">АНАЛИЗ РЫНКА ИНСТРУМЕНТОВ БЕНЧМАРКИНГА</h1>
        <p className="slide-subtitle">Глобальные тенденции и структурные изменения рынка СУБД</p>
      </motion.div>

      <div className="content-container-s8">
        <div className="main-charts-grid-s8">
          <motion.div 
            className="chart-container-s8 regional-trends-chart-s8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
          </motion.div>

          <motion.div 
            className="chart-container-s8 popularity-trends-chart-s8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="chart-title-s8">Тренды популярности бенчмарков</h3>
            <div className="chart" ref={popularityTrendsChartRef}></div>
            <div className="legend-s8-popularity">
              {popularityChartCategories.map(cat => (
                <div key={cat.key} className="legend-item-s8">
                  <div className="legend-color-s8" style={{ backgroundColor: cat.color }}></div>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="chart-container-s8 energy-efficiency-chart-s8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="chart-title-s8">Энергоэффективность и стоимость транзакций СУБД (2023-2025)</h3>
            <div className="chart" ref={energyEfficiencyChartRef}></div>
            <div className="legend-s8-energy">
              {energyChartCategories.map(cat => (
                <div key={cat.key} className="legend-item-s8">
                  <div className="legend-color-s8" style={{ backgroundColor: cat.color }}></div>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="chart-container-s8 industry-adoption-chart-s8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="chart-title-s8">Внедрение бенчмаркинга по отраслям</h3>
            <div className="chart" ref={industryAdoptionChartRef}></div>
          </motion.div>
        </div>

        <div className="sidebar-s8">
          <MetricCard title="📊 Рыночная доля" variant="donuts" delay={0.8}>
            <div className="chart sidebar-donut-chart-s8" ref={marketShareChartRef}></div>
            <div className="legend-s8-donut">
              {benchmarkTypesData.map(item => (
                <div key={item.type} className="legend-item-s8">
                  <div className="legend-color-s8" style={{ backgroundColor: item.color }}></div>
                  <span>{item.type} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </MetricCard>
          
          <MetricCard title="📈 Ключевые показатели" variant="metrics" delay={0.9}>
            <div className="key-metrics-grid-s8">
              {keyMetricsData.map(metric => (
                <div key={metric.label} className="key-metric-item-s8">
                  <span className="metric-icon-s8">{metric.icon}</span>
                  <span className="metric-value-s8">{metric.value}</span>
                  <span className="metric-label-s8">{metric.label}</span>
                </div>
              ))}
            </div>
          </MetricCard>

          <MetricCard title="💡 Ключевые выводы" variant="insights" delay={1.0}>
            {keyInsightsData.map((insight, index) => (
              <div key={index} className="insight-item">
                <strong>{insight.number}</strong> {insight.text}
              </div>
            ))}
          </MetricCard>
        </div>
      </div>
    </div>
  );
}; 