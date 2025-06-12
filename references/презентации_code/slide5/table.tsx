import React, { useState, useEffect } from "react";
import "./DatabaseToolsTable.css";

const DatabaseToolsTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tools = [
    {
      name: "pgBench",
      type: "Специализированный",
      scope: "PostgreSQL",
      features: "Простота использования, оптимизирован для PostgreSQL",
      limitations: "Только для PostgreSQL",
      typeColor: "specialized",
    },
    {
      name: "cassandra-stress",
      type: "Специализированный",
      scope: "Cassandra",
      features: "Встроенный инструмент, оптимизирован для Cassandra",
      limitations: "Только для Cassandra",
      typeColor: "specialized",
    },
    {
      name: "MongoDB Benchmarking Tools",
      type: "Специализированный",
      scope: "MongoDB",
      features: "Оптимизирован для дисковой подсистемы",
      limitations: "Только для MongoDB",
      typeColor: "specialized",
    },
    {
      name: "TPC (TPC-C, TPC-H)",
      type: "Универсальный",
      scope: "Реляционные СУБД",
      features: "Индустриальный стандарт",
      limitations: "Сложность настройки, ориентирован на реляционные системы",
      typeColor: "universal",
    },
    {
      name: "Sysbench",
      type: "Универсальный",
      scope: "Различные СУБД",
      features: "Хороший инструмент",
      limitations: "Ограниченная поддержка NoSQL",
      typeColor: "universal",
    },
    {
      name: "YCSB",
      type: "Универсальный",
      scope: "Различные СУБД",
      features: "Поддержка NoSQL и SQL, простота настройки",
      limitations: "—",
      typeColor: "universal",
      highlighted: true,
    },
  ];

  return (
    <div className="container">
      {/* Header Banner */}
      <div className="header-banner">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1 className="header-title">ТЕХНОЛОГИИ ТЕСТИРОВАНИЯ СУБД</h1>
        </div>
        <div className="header-shimmer"></div>
      </div>

      <div className="main-content">
        {/* Subtitle */}
        <div className="subtitle-container">
          <p className="subtitle">Обзор инструментов бенчмаркинга</p>
        </div>

        {/* Table Container */}
        <div className={`table-container ${isVisible ? "visible" : ""}`}>
          <div className="table-wrapper">
            <table className="main-table">
              <thead>
                <tr className="header-row">
                  <th className="header-cell">ИНСТРУМЕНТ</th>
                  <th className="header-cell">ТИП</th>
                  <th className="header-cell">ОБЛАСТЬ ПРИМЕНЕНИЯ</th>
                  <th className="header-cell">ОСОБЕННОСТИ</th>
                  <th className="header-cell">ОГРАНИЧЕНИЯ</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => (
                  <tr
                    key={index}
                    className={`
                      data-row
                      ${tool.highlighted ? "highlighted-row" : ""}
                      ${hoveredRow === index ? "hovered-row" : ""}
                    `}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="data-cell">
                      <div
                        className={`tool-name ${
                          tool.highlighted ? "highlighted-name" : ""
                        }`}
                      >
                        {tool.name}
                      </div>
                    </td>
                    <td className="data-cell">
                      <span
                        className={`type-badge ${tool.typeColor} ${
                          hoveredRow === index ? "hovered-badge" : ""
                        }`}
                      >
                        {tool.type}
                      </span>
                    </td>
                    <td className="data-cell">
                      <div className="scope-text">{tool.scope}</div>
                    </td>
                    <td className="data-cell">
                      <div className="features-text">{tool.features}</div>
                    </td>
                    <td className="data-cell">
                      <div className="limitations-text">{tool.limitations}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conclusion */}
        <div className="conclusion-container">
          <h3 className="conclusion-title">
            <span className="conclusion-dot"></span>
            Вывод
          </h3>
          <p className="conclusion-text">
            Для объективного сравнения производительности PostgreSQL, Cassandra
            и MongoDB был выбран
            <strong className="ycsb-highlight"> YCSB</strong> как универсальный
            инструмент с поддержкой как реляционных, так и NoSQL систем.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseToolsTable;
