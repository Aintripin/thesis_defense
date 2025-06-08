import React from 'react';
import './TestExecutionSlide.scss';

const TestExecutionSlide = () => {
  return (
    <div className="test-execution-slide">
      {/* The correct header, at the top of the page */}
      <div className="slide-header">
        <h1 className="slide-title">П Р О В Е Д Е Н И Е&nbsp;&nbsp;Т Е С Т О В</h1>
        <p className="slide-subtitle">Методология и контроль качества</p>
      </div>

      {/* The main content area, separate from the header */}
      <div className="content-container">
        <div className="main-grid">
          {/* Protocol Section */}
          <div className="protocol-section">
            <h3 className="block-title">Протокол проведения</h3>
            <div className="section-title">Последовательность выполнения:</div>
            <ul className="protocol-list">
              <li className="protocol-item">
                Последовательное выполнение всех workload'ов (A-F)
              </li>
              <li className="protocol-item">
                Для каждого workload'а: тестирование с 7 различными уровнями параллелизма
              </li>
              <li className="protocol-item">
                21 конфигурация на СУБД × 3 повторения ={' '}
                <span className="highlight-text">63 теста на СУБД</span>
              </li>
              <li className="protocol-item">
                Общее количество тестов:{' '}
                <span className="highlight-text">189 для трех СУБД</span>
              </li>
            </ul>
            <div className="section-title">Контроль условий:</div>
            <div className="control-grid">
              <div className="control-item">
                <div className="control-title">"Холодный" старт</div>
                <div className="control-desc">Каждого теста</div>
              </div>
              <div className="control-item">
                <div className="control-title">Мониторинг</div>
                <div className="control-desc">Системных ресурсов</div>
              </div>
              <div className="control-item">
                <div className="control-title">Фиксация условий</div>
                <div className="control-desc">Состояние системы</div>
              </div>
              <div className="control-item">
                <div className="control-title">Проверка корректности</div>
                <div className="control-desc">Выполнения операций</div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-main">
            <h3 className="block-title">Статистическая достоверность</h3>
            <div className="stats-content">
              <div>
                <div className="section-title">Обеспечение надежности:</div>
                <div className="reliability-grid">
                  <div className="reliability-item">
                    <div className="reliability-title">Трехкратное повторение</div>
                    <div className="reliability-desc">каждого теста</div>
                  </div>
                  <div className="reliability-item">
                    <div className="reliability-title">Расчет средних значений</div>
                    <div className="reliability-desc">и стандартных отклонений</div>
                  </div>
                  <div className="reliability-item">
                    <div className="reliability-title">Исключение выбросов</div>
                    <div className="reliability-desc">при анализе данных</div>
                  </div>
                  <div className="reliability-item">
                    <div className="reliability-title">Доверительные интервалы</div>
                    <div className="reliability-desc">для ключевых метрик</div>
                  </div>
                </div>
                <div className="reliability-section">
                  <div className="section-title">Контрольные проверки:</div>
                  <ul className="protocol-list">
                    <li className="protocol-item">Валидация результатов между повторными запусками</li>
                    <li className="protocol-item">Проверка согласованности метрик YCSB</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="section-title">Дополнительные проверки:</div>
                <ul className="protocol-list">
                  <li className="protocol-item">Анализ системных логов на предмет ошибок</li>
                  <li className="protocol-item">Верификация целостности данных после тестов</li>
                </ul>
                <div className="reliability-section">
                  <div className="section-title">Документирование:</div>
                  <div className="stats-grid">
                    <div className="stats-item">
                      <div className="stats-label">Детальные логи</div>
                      <div className="stats-value">Каждого запуска</div>
                    </div>
                    <div className="stats-item">
                      <div className="stats-label">Конфигурации</div>
                      <div className="stats-value">Воспроизводимость</div>
                    </div>
                    <div className="stats-item">
                      <div className="stats-label">Временные метки</div>
                      <div className="stats-value">Условия проведения</div>
                    </div>
                    <div className="stats-item">
                      <div className="stats-label">Промежуточные</div>
                      <div className="stats-value">Результаты</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Number Cards */}
          <div className="number-card card-189">
            <div className="big-number">189</div>
            <div className="number-label">Общее количество тестов</div>
            <div className="calculation">3 СУБД × 6 workloads × 7 threads × 3 повторения</div>
          </div>
          <div className="number-card card-63">
            <div className="big-number">63</div>
            <div className="number-label">Тестов на СУБД</div>
            <div className="calculation">21 конфигурация × 3 повторения</div>
          </div>

          {/* Metrics Card with corrected structure */}
          <div className="card-metrics">
            <div className="metrics-title">Собираемые метрики:</div>
            <ul className="metrics-list">
              <li className="metric-item">Пропускная способность (ops/sec)</li>
              <li className="metric-item">Задержки (среднее, мин, макс, P95, P99)</li>
              <li className="metric-item">Системные метрики (CPU, память)</li>
              <li className="metric-item">Дисковый I/O и сеть</li>
            </ul>
            <div className="process-flow">
              <div className="flow-step">
                <div className="step-number">1</div>
                <span>Workload A-F</span>
              </div>
              <div className="flow-step">
                <div className="step-number">2</div>
                <span>7 уровней threads</span>
              </div>
              <div className="flow-step">
                <div className="step-number">3</div>
                <span>3 повторения</span>
              </div>
              <div className="flow-step">
                <div className="step-number">4</div>
                <span>Анализ результатов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionSlide; 