import React from 'react';

const StatsSection: React.FC = () => {
  return (
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
  );
};

export default StatsSection; 