export const energyEfficiencyRawData = [
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

export const energyChartCategories = [
  { dbms: "Relational", deploy: "On-Premise", name: "Relational (On-Prem)", color: "#A855F7", key: "Relational_On-Premise" },
  { dbms: "Relational", deploy: "Cloud", name: "Relational (Cloud)", color: "#D8B4FE", key: "Relational_Cloud" },
  { dbms: "NoSQL", deploy: "On-Premise", name: "NoSQL (On-Prem)", color: "#22C55E", key: "NoSQL_On-Premise" },
  { dbms: "NoSQL", deploy: "Cloud", name: "NoSQL (Cloud)", color: "#86EFAC", key: "NoSQL_Cloud" },
  { dbms: "Graph", deploy: "On-Premise", name: "Graph (On-Prem)", color: "#F97316", key: "Graph_On-Premise" },
  { dbms: "Graph", deploy: "Cloud", name: "Graph (Cloud)", color: "#FDBA74", key: "Graph_Cloud" },
  { dbms: "Cloud-Native", deploy: "Cloud", name: "Cloud-Native", color: "#0EA5E9", key: "Cloud-Native_Cloud" }
]; 