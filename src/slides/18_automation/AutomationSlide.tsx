import React from 'react';
import './AutomationSlide.scss';

const AutomationSlide = () => {
  return (
    <div className="automation-slide">
      {/* Header like slide 17 */}
      <div className="slide-header">
        <h1 className="slide-title">А В Т О М А Т И З А Ц И Я&nbsp;&nbsp;С Б О Р А&nbsp;&nbsp;Р Е З У Л Ь Т А Т О В</h1>
        <p className="slide-subtitle">Python-скрипт для обработки данных</p>
      </div>

      {/* Main content area */}
      <div className="content-container">
        <div className="content-grid">
          {/* Left column: Functionality */}
          <div className="content-section">
            <div className="section-block">
              <div className="script-info">
                <div className="script-name">parse_ycsb.py</div>
                <div className="script-desc">
                  Автоматизированный парсинг результатов YCSB тестирования
                </div>
              </div>

              <div className="category-title">Функциональность скрипта:</div>
              <ul className="feature-list">
                <li className="feature-item">
                  <strong>Автоматическое извлечение</strong> метрик из отчетов YCSB
                </li>
                <li className="feature-item">
                  <strong>Парсинг различных форматов</strong> выходных данных
                </li>
                <li className="feature-item">
                  <strong>Агрегация результатов</strong> по СУБД, workload'ам и потокам
                </li>
                <li className="feature-item">
                  <strong>Расчет статистических показателей</strong> (среднее, медиана, стандартное отклонение)
                </li>
              </ul>

              <div className="output-section">
                <div className="category-title">Структура выходных данных:</div>
                <div className="output-grid">
                  <div className="output-item">
                    <div className="output-title">CSV-файлы</div>
                    <div className="output-desc">
                      Агрегированные результаты для каждой СУБД
                    </div>
                  </div>
                  <div className="output-item">
                    <div className="output-title">Сводные таблицы</div>
                    <div className="output-desc">
                      Данные для сравнительного анализа
                    </div>
                  </div>
                  <div className="output-item">
                    <div className="output-title">JSON-файлы</div>
                    <div className="output-desc">
                      Интеграция с системами визуализации
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Extracted metrics */}
          <div className="content-section">
            <div className="section-block">
              <div className="category-title">Извлекаемые метрики:</div>

              <div className="metrics-section">
                <div className="metric-group">
                  <div className="group-title">Общие метрики</div>
                  <div className="group-items">
                    • Время выполнения (RunTime)<br />
                    • Пропускная способность (Throughput, ops/sec)
                  </div>
                </div>

                <div className="metric-group">
                  <div className="group-title">Метрики сборки мусора</div>
                  <div className="group-items">
                    • G1 Young Generation (количество, время, %)<br />
                    • G1 Old Generation (количество, время, %)
                  </div>
                </div>

                <div className="metric-group">
                  <div className="group-title">Операции YCSB</div>
                  <div className="group-items">
                    • READ, UPDATE, INSERT, SCAN<br />
                    • READ-MODIFY-WRITE, CLEANUP
                  </div>
                </div>

                <div className="metric-group">
                  <div className="group-title">Задержки операций</div>
                  <div className="group-items">
                    • Среднее значение (AverageLatency)<br />
                    • Минимум и максимум<br />
                    • Перцентили: P95, P99
                  </div>
                </div>
              </div>

              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-title">Всего метрик</div>
                  <div className="metric-value">60+<br />параметров</div>
                </div>
                <div className="metric-card">
                  <div className="metric-title">Формат вывода</div>
                  <div className="metric-value">CSV<br />структура</div>
                </div>
                <div className="metric-card">
                  <div className="metric-title">Автоматизация</div>
                  <div className="metric-value">100%<br />процесса</div>
                </div>
                <div className="metric-card">
                  <div className="metric-title">Точность</div>
                  <div className="metric-value">Микросекунды<br />(μs)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationSlide; 