// Типы для Recharts tooltip
export interface TooltipPayload {
  color: string;
  name?: string;
  dataKey: string;
  value: number | string;
  unit?: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

// Типы данных
export interface BenchmarkType {
  type: string;
  value: number;
  color: string;
}

export interface RegionTrendData {
  year: number;
  northAmerica: number;
  europe: number;
  asiaPacific: number;
  latinAmerica: number;
  middleEast: number;
}

export interface PopularityTrendData {
  year: number;
  tpcC: number;
  tpcH: number;
  ycsb: number;
  hammerdb: number;
  sysbench: number;
  other: number;
}

export interface DbmsGrowthData {
  year: number;
  relational: number;
  nosql: number;
  graph: number;
  cloud: number;
  total: number;
}

export interface IndustryData {
  industry: string;
  percent: number;
  shortName: string;
}

export interface KeyMetric {
  icon: string;
  value: string;
  label: string;
}

export interface KeyInsight {
  number: string;
  text: string;
}
