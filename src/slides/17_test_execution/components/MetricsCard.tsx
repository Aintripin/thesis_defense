import React from 'react';

const MetricsCard: React.FC = () => {
  return (
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
  );
};

export default MetricsCard; 