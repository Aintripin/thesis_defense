import React from 'react';
import styles from '../TestExecutionSlide.module.scss';

const StatsSection: React.FC = () => {
  return (
    <div className={styles.statsMain}>
      <h3 className={styles.blockTitle}>Статистическая достоверность</h3>
      <div className={styles.statsContent}>
        <div>
          <div className={styles.sectionTitle}>Обеспечение надежности:</div>
          <div className={styles.reliabilityGrid}>
            <div className={styles.reliabilityItem}>
              <div className={styles.reliabilityTitle}>Трехкратное повторение</div>
              <div className={styles.reliabilityDesc}>каждого теста</div>
            </div>
            <div className={styles.reliabilityItem}>
              <div className={styles.reliabilityTitle}>Расчет средних значений</div>
              <div className={styles.reliabilityDesc}>и стандартных отклонений</div>
            </div>
            <div className={styles.reliabilityItem}>
              <div className={styles.reliabilityTitle}>Исключение выбросов</div>
              <div className={styles.reliabilityDesc}>при анализе данных</div>
            </div>
            <div className={styles.reliabilityItem}>
              <div className={styles.reliabilityTitle}>Доверительные интервалы</div>
              <div className={styles.reliabilityDesc}>для ключевых метрик</div>
            </div>
          </div>
          <div className={styles.reliabilitySection}>
            <div className={styles.sectionTitle}>Контрольные проверки:</div>
            <ul className={styles.protocolList}>
              <li className={styles.protocolItem}>Валидация результатов между повторными запусками</li>
              <li className={styles.protocolItem}>Проверка согласованности метрик YCSB</li>
            </ul>
          </div>
        </div>
        <div>
          <div className={styles.sectionTitle}>Дополнительные проверки:</div>
          <ul className={styles.protocolList}>
            <li className={styles.protocolItem}>Анализ системных логов на предмет ошибок</li>
            <li className={styles.protocolItem}>Верификация целостности данных после тестов</li>
          </ul>
          <div className={styles.reliabilitySection}>
            <div className={styles.sectionTitle}>Документирование:</div>
            <div className={styles.statsGrid}>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>Детальные логи</div>
                <div className={styles.statsValue}>Каждого запуска</div>
              </div>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>Конфигурации</div>
                <div className={styles.statsValue}>Воспроизводимость</div>
              </div>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>Временные метки</div>
                <div className={styles.statsValue}>Условия проведения</div>
              </div>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>Промежуточные</div>
                <div className={styles.statsValue}>Результаты</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 