import React from 'react';

const ProtocolSection: React.FC = () => {
  return (
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
  );
};

export default ProtocolSection; 