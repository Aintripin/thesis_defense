// Common chart margins
export const CHART_MARGINS = {
  standard: { top: 20, right: 30, bottom: 50, left: 50 },
  withLargeLeftMargin: { top: 20, right: 30, bottom: 50, left: 65 },
  barChart: { top: 20, right: 20, bottom: 65, left: 50 },
  donut: { top: 5, right: 5, bottom: 5, left: 5 },
};

// Common colors
export const CHART_COLORS = {
  grid: "#AEB8C4",
  text: "#475569",
  textDark: "#334155",
  white: "#ffffff",
};

// Common chart styling helper
export const applyAxisStyles = (selection: any, color: string = CHART_COLORS.text, fontSize: string = "10px") => {
  selection.selectAll("text")
    .style("fill", color)
    .style("font-size", fontSize);
  selection.selectAll(".domain, line")
    .style("stroke", CHART_COLORS.grid);
};

// Animation delays helper
export const getStaggeredDelay = (index: number, baseDelay: number = 150) => index * baseDelay; 