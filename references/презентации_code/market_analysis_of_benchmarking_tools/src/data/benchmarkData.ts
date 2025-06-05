// Реальные данные из CSV
export const benchmarkTypes = [
  { type: "TPC стандарты", value: 42, color: "#1E3A8A" },
  { type: "Open Source (YCSB)", value: 31, color: "#3B82F6" },
  { type: "Вендорские", value: 18, color: "#60A5FA" },
  { type: "Внутренние", value: 9, color: "#93C5FD" },
];

// Региональные тренды
export const regionTrends = [
  {
    year: 2024,
    northAmerica: 42,
    europe: 28,
    asiaPacific: 22,
    latinAmerica: 5,
    middleEast: 3,
  },
  {
    year: 2025,
    northAmerica: 44,
    europe: 29,
    asiaPacific: 24,
    latinAmerica: 5.5,
    middleEast: 3.5,
  },
  {
    year: 2026,
    northAmerica: 45,
    europe: 30,
    asiaPacific: 27,
    latinAmerica: 6,
    middleEast: 4,
  },
  {
    year: 2027,
    northAmerica: 46,
    europe: 31,
    asiaPacific: 30,
    latinAmerica: 6.5,
    middleEast: 4.5,
  },
  {
    year: 2028,
    northAmerica: 47,
    europe: 32,
    asiaPacific: 33,
    latinAmerica: 7,
    middleEast: 5,
  },
  {
    year: 2029,
    northAmerica: 48,
    europe: 33,
    asiaPacific: 36,
    latinAmerica: 7.5,
    middleEast: 5.5,
  },
  {
    year: 2030,
    northAmerica: 49,
    europe: 34,
    asiaPacific: 39,
    latinAmerica: 8,
    middleEast: 6,
  },
];

// Тренды популярности бенчмарков
export const popularityTrends = [
  {
    year: 2018,
    tpcC: 35,
    tpcH: 28,
    ycsb: 14,
    hammerdb: 8,
    sysbench: 6,
    other: 9,
  },
  {
    year: 2019,
    tpcC: 33,
    tpcH: 27,
    ycsb: 16,
    hammerdb: 9,
    sysbench: 6,
    other: 9,
  },
  {
    year: 2020,
    tpcC: 30,
    tpcH: 26,
    ycsb: 19,
    hammerdb: 10,
    sysbench: 6,
    other: 9,
  },
  {
    year: 2021,
    tpcC: 28,
    tpcH: 25,
    ycsb: 22,
    hammerdb: 11,
    sysbench: 5,
    other: 9,
  },
  {
    year: 2022,
    tpcC: 26,
    tpcH: 23,
    ycsb: 25,
    hammerdb: 12,
    sysbench: 5,
    other: 9,
  },
  {
    year: 2023,
    tpcC: 24,
    tpcH: 21,
    ycsb: 28,
    hammerdb: 13,
    sysbench: 5,
    other: 9,
  },
  {
    year: 2024,
    tpcC: 22,
    tpcH: 19,
    ycsb: 31,
    hammerdb: 14,
    sysbench: 5,
    other: 9,
  },
];

// Рост рынка СУБД по типам
export const dbmsGrowth = [
  {
    year: 2023,
    relational: 70.76,
    nosql: 7.55,
    graph: 2.9,
    cloud: 12.64,
    total: 100.79,
  },
  {
    year: 2024,
    relational: 79.61,
    nosql: 9.82,
    graph: 3.5,
    cloud: 16.08,
    total: 129.01,
  },
  {
    year: 2025,
    relational: 89.57,
    nosql: 12.77,
    graph: 4.2,
    cloud: 20.44,
    total: 150.38,
  },
  {
    year: 2026,
    relational: 100.75,
    nosql: 16.6,
    graph: 5.0,
    cloud: 26.02,
    total: 173.37,
  },
  {
    year: 2027,
    relational: 113.34,
    nosql: 21.58,
    graph: 6.0,
    cloud: 33.09,
    total: 199.01,
  },
  {
    year: 2028,
    relational: 127.51,
    nosql: 28.05,
    graph: 7.2,
    cloud: 42.09,
    total: 229.85,
  },
  {
    year: 2029,
    relational: 143.45,
    nosql: 36.47,
    graph: 8.6,
    cloud: 53.49,
    total: 267.01,
  },
  {
    year: 2030,
    relational: 161.38,
    nosql: 47.41,
    graph: 10.9,
    cloud: 68.03,
    total: 292.22,
  },
];

// Данные по отраслям
export const industryData = [
  { industry: "Финансы", percent: 78, shortName: "Финансы" },
  { industry: "ИТ и Телеком", percent: 72, shortName: "ИТ" },
  { industry: "E-Commerce", percent: 67, shortName: "E-Com" },
  { industry: "Здравоохранение", percent: 53, shortName: "Здрав-е" },
  { industry: "Производство", percent: 42, shortName: "Произв-о" },
  { industry: "Государство", percent: 38, shortName: "Гос-во" },
  { industry: "Транспорт", percent: 35, shortName: "Трансп." },
  { industry: "Образование", percent: 29, shortName: "Образ-е" },
  { industry: "Ритейл", percent: 25, shortName: "Ритейл" },
  { industry: "Строительство", percent: 18, shortName: "Стройка" },
];

// Ключевые метрики
export const keyMetrics = [
  { icon: "💰", value: "292.22B", label: "USD к 2030" },
  { icon: "📈", value: "+14.21%", label: "CAGR" },
  { icon: "🚀", value: "6x", label: "NoSQL рост" },
  { icon: "☁️", value: "5.4x", label: "Облачные" },
];

// Ключевые инсайты
export const keyInsights = [
  { number: "31%", text: "YCSB опережает TPC-H" },
  { number: "2022", text: "Точка смены парадигм" },
  { number: "+77%", text: "Азия лидирует по росту" },
  { number: "78%", text: "Финансы ведут внедрение" },
  { number: "6x", text: "Рост NoSQL к 2030" },
];
