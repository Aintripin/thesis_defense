import React from 'react';
import './YcsbConfigurationSlide.scss';

const YcsbConfigurationSlide: React.FC = () => {
  return (
    <div className="ycsb-configuration-slide">
      <div className="content-container">
        <div className="main-content-container">
          
          <div className="slide-title-container">
            <h1 className="slide-title">К О Н Ф И Г У Р А Ц И Я&nbsp;&nbsp;Y C S B</h1>
            <p className="slide-subtitle">Параметры тестирования производительности СУБД</p>
          </div>

          <div className="slide-content">
            
            {/* Левая колонка */}
            <div className="config-section">
              <div className="config-block primary">
                <div className="block-header">
                  <div className="block-icon">⚙</div>
                  <h3 className="block-title">Основные параметры</h3>
                </div>
                <div className="block-content">
                  <ul className="config-list">
                    <li className="config-item">
                      <span className="config-label">Record Count</span>
                      <span className="config-value">4,894,081</span>
                    </li>
                    <li className="config-item">
                      <span className="config-label">Operation Count</span>
                      <span className="config-value">4,894,081</span>
                    </li>
                    <li className="config-item">
                      <span className="config-label">Threads</span>
                      <span className="config-value">[4,8,16,32,64,128,256]</span>
                    </li>
                    <li className="config-item">
                      <span className="config-label">Распределение</span>
                      <span className="config-value">zipfian</span>
                    </li>
                    <li className="config-item">
                      <span className="config-label">Повторения</span>
                      <span className="config-value">3x</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="config-block accent">
                <div className="block-header">
                  <div className="block-icon">🗄</div>
                  <h3 className="block-title">Драйверы СУБД</h3>
                </div>
                <div className="block-content">
                  <div className="drivers-grid">
                    <div className="driver-item">
                      <div className="driver-name">MongoDB</div>
                      <div className="driver-desc">Стандартный YCSB драйвер для документоориентированной СУБД</div>
                    </div>
                    <div className="driver-item">
                      <div className="driver-name">Cassandra</div>
                      <div className="driver-desc">CQL-драйвер для колоночной распределенной СУБД</div>
                    </div>
                    <div className="driver-item">
                      <div className="driver-name">PostgreSQL</div>
                      <div className="driver-desc">JDBC-драйвер для реляционной СУБД</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Средняя колонка */}
            <div className="config-section">
              <div className="config-block workloads-block">
                <div className="block-header">
                  <div className="block-icon">📊</div>
                  <h3 className="block-title">Рабочие нагрузки <span className="stat-highlight">6 типов</span></h3>
                </div>
                <div className="block-content">
                  <div className="workload-grid">
                    <div className="workload-card">
                      <h4 className="workload-title">
                        <span className="workload-letter">A</span>
                        Workload A
                      </h4>
                      <div className="workload-description">
                        <span className="workload-type">Baseline</span>
                        <span className="workload-detail">сбалансированная нагрузка</span>
                      </div>
                      <div className="workload-metrics">50% read / 50% update</div>
                    </div>

                    <div className="workload-card">
                      <h4 className="workload-title">
                        <span className="workload-letter">B</span>
                        Workload B
                      </h4>
                      <div className="workload-description">
                        <span className="workload-type">Read-Heavy</span>
                        <span className="workload-detail">преимущественно чтение</span>
                      </div>
                      <div className="workload-metrics">95% read / 5% update</div>
                    </div>

                    <div className="workload-card">
                      <h4 className="workload-title">
                        <span className="workload-letter">C</span>
                        Workload C
                      </h4>
                      <div className="workload-description">
                        <span className="workload-type">Read-Only</span>
                        <span className="workload-detail">только чтение</span>
                      </div>
                      <div className="workload-metrics">100% read</div>
                    </div>

                    <div className="workload-card">
                      <h4 className="workload-title">
                        <span className="workload-letter">D</span>
                        Workload D
                      </h4>
                      <div className="workload-description">
                        <span className="workload-type">Read-Latest</span>
                        <span className="workload-detail">чтение последних записей</span>
                      </div>
                      <div className="workload-metrics">95% read latest / 5% insert</div>
                    </div>

                    <div className="workload-card">
                      <h4 className="workload-title">
                        <span className="workload-letter">E</span>
                        Workload E
                      </h4>
                      <div className="workload-description">
                        <span className="workload-type">Scan-Heavy</span>
                        <span className="workload-detail">сканирование диапазонов</span>
                      </div>
                      <div className="workload-metrics">95% scan / 5% insert</div>
                    </div>

                    <div className="workload-card">
                      <h4 className="workload-title">
                        <span className="workload-letter">F</span>
                        Workload F
                      </h4>
                      <div className="workload-description">
                        <span className="workload-type">Read-Modify-Write</span>
                        <span className="workload-detail">чтение с модификацией</span>
                      </div>
                      <div className="workload-metrics">50% read / 50% RMW</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="config-section">
              <div className="config-block">
                <div className="block-header">
                  <div className="block-icon">🔄</div>
                  <h3 className="block-title">Процедура тестирования</h3>
                </div>
                <div className="block-content">
                  <ul className="procedure-list">
                    <li className="procedure-item">
                      Трехкратное повторение каждой комбинации параметров
                    </li>
                    <li className="procedure-item">
                      Полный перезапуск СУБД между тестами
                    </li>
                    <li className="procedure-item">
                      Продолжительность тестирования: ≥120 минут
                    </li>
                    <li className="procedure-item">
                      Идентичные параметры для всех исследуемых СУБД
                    </li>
                    <li className="procedure-item">
                      Единая методология измерения производительности
                    </li>
                    <li className="procedure-item">
                      Стандартизированная форма отчетности
                    </li>
                  </ul>
                </div>
              </div>

              <div className="config-block accent">
                <div className="block-header">
                  <div className="block-icon">✨</div>
                  <h3 className="block-title">Ключевые особенности</h3>
                </div>
                <div className="block-content">
                  <ul className="features-list">
                    <li className="feature-item">
                      <div className="feature-icon">⚡</div>
                      Zipfian распределение для имитации реальных "горячих" точек доступа
                    </li>
                    <li className="feature-item">
                      <div className="feature-icon">🎯</div>
                      Минимизация влияния кэширования на результаты измерений
                    </li>
                    <li className="feature-item">
                      <div className="feature-icon">📐</div>
                      Обеспечение полной сопоставимости результатов между СУБД
                    </li>
                    <li className="feature-item">
                      <div className="feature-icon">🔍</div>
                      Комплексное покрытие спектра рабочих нагрузок
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default YcsbConfigurationSlide; 