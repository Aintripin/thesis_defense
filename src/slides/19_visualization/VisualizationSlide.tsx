import React from 'react';
import './VisualizationSlide.scss';

const VisualizationSlide = () => {
  return (
    <div className="visualization-slide">
      {/* Header like slides 17 & 18 */}
      <div className="slide-header">
        <h1 className="slide-title">В И З У А Л И З А Ц И Я&nbsp;&nbsp;И&nbsp;&nbsp;Р Е К О М Е Н Д А Ц И И</h1>
        <p className="slide-subtitle">Apache Superset дашборды</p>
      </div>

      {/* Main content area */}
      <div className="content-container">
        <div className="content-grid">
          {/* Left column: Visualization */}
          <div className="content-section">
            <div className="section-block">
              <div className="superset-header">
                <div className="superset-title">Apache Superset</div>
                <div className="superset-desc">
                  Платформа для интерактивной визуализации данных
                </div>
              </div>

              <div className="block-title">Типы созданных визуализаций:</div>
              <ul className="visualization-list">
                <li className="viz-item">
                  Линейные графики пропускной способности по количеству потоков
                </li>
                <li className="viz-item">
                  Гистограммы сравнения производительности по workload'ам
                </li>
                <li className="viz-item">Тепловые карты задержек операций</li>
                <li className="viz-item">
                  Сравнительные диаграммы масштабируемости СУБД
                </li>
              </ul>

              <div className="block-title">Ключевые дашборды:</div>
              <div className="dashboard-grid">
                <div className="dashboard-item">
                  <div className="dashboard-name">"Обзор производительности"</div>
                  <div className="dashboard-desc">
                    Сравнение всех СУБД по основным метрикам
                  </div>
                </div>
                <div className="dashboard-item">
                  <div className="dashboard-name">"Анализ масштабируемости"</div>
                  <div className="dashboard-desc">
                    Поведение при увеличении параллелизма
                  </div>
                </div>
                <div className="dashboard-item">
                  <div className="dashboard-name">"Детализация по операциям"</div>
                  <div className="dashboard-desc">
                    Задержки для различных типов операций
                  </div>
                </div>
                <div className="dashboard-item">
                  <div className="dashboard-name">
                    "Workload-специфичные паттерны"
                  </div>
                  <div className="dashboard-desc">
                    Оптимальные сценарии для каждой СУБД
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Recommendations */}
          <div className="content-section">
            <div className="section-block">
              <div className="block-title">Рекомендации по выбору СУБД:</div>

              <div className="db-section db-mongodb">
                <div className="db-title mongodb-color">MongoDB</div>
                <div className="db-subtitle">Оптимальные сценарии:</div>
                <ul className="db-features">
                  <li className="db-feature">Приложения с гибкой схемой данных</li>
                  <li className="db-feature">
                    Системы с преобладанием операций чтения
                  </li>
                  <li className="db-feature">Сложные вложенные документы</li>
                </ul>
                <div className="performance-metrics">
                  <div className="metric-card">
                    <div className="metric-label">Workload D</div>
                    <div className="metric-value">47.7k ops/sec</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Workload E</div>
                    <div className="metric-value">23.9k ops/sec</div>
                  </div>
                </div>
              </div>

              <div className="db-section db-cassandra">
                <div className="db-title cassandra-color">Cassandra</div>
                <div className="db-subtitle">Сильные стороны:</div>
                <ul className="db-features">
                  <li className="db-feature">
                    Системы с высокой интенсивностью записи
                  </li>
                  <li className="db-feature">
                    Лидер по пропускной способности Workload A-C
                  </li>
                  <li className="db-feature">Низкие задержки операций обновления</li>
                </ul>
                <div className="performance-metrics">
                  <div className="metric-card">
                    <div className="metric-label">Workload A-C</div>
                    <div className="metric-value">24.2-29.2k ops/sec</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Workload E</div>
                    <div className="metric-value">1.81k ops/sec</div>
                  </div>
                </div>
                <div className="limitations">
                  <div className="limitations-title">Ограничения:</div>
                  <div className="limitations-text">
                    Низкая эффективность сканирования
                  </div>
                </div>
              </div>

              <div className="db-section db-postgresql">
                <div className="db-title postgresql-color">PostgreSQL</div>
                <div className="db-subtitle">Универсальность:</div>
                <ul className="db-features">
                  <li className="db-feature">
                    Исключительная производительность Workload D
                  </li>
                  <li className="db-feature">Полноценная ACID-совместимость</li>
                  <li className="db-feature">
                    Нелинейная масштабируемость с пиком при 128 потоков
                  </li>
                </ul>
                <div className="performance-metrics">
                  <div className="metric-card">
                    <div className="metric-label">Workload D</div>
                    <div className="metric-value">55.8k ops/sec</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Workload E</div>
                    <div className="metric-value">9.62k ops/sec</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationSlide; 