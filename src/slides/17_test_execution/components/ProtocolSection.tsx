import React from 'react';
import styles from '../TestExecutionSlide.module.scss';

const ProtocolSection: React.FC = () => {
  return (
    <div className={styles.protocolSection}>
      <h3 className={styles.blockTitle}>Протокол проведения</h3>
      <div className={styles.sectionTitle}>Последовательность выполнения:</div>
      <ul className={styles.protocolList}>
        <li className={styles.protocolItem}>
          Последовательное выполнение всех workload'ов (A-F)
        </li>
        <li className={styles.protocolItem}>
          Для каждого workload'а: тестирование с 7 различными уровнями параллелизма
        </li>
        <li className={styles.protocolItem}>
          21 конфигурация на СУБД × 3 повторения ={' '}
          <span className={styles.highlightText}>63 теста на СУБД</span>
        </li>
        <li className={styles.protocolItem}>
          Общее количество тестов:{' '}
          <span className={styles.highlightText}>189 для трех СУБД</span>
        </li>
      </ul>
      <div className={styles.sectionTitle}>Контроль условий:</div>
      <div className={styles.controlGrid}>
        <div className={styles.controlItem}>
          <div className={styles.controlTitle}>"Холодный" старт</div>
          <div className={styles.controlDesc}>Каждого теста</div>
        </div>
        <div className={styles.controlItem}>
          <div className={styles.controlTitle}>Мониторинг</div>
          <div className={styles.controlDesc}>Системных ресурсов</div>
        </div>
        <div className={styles.controlItem}>
          <div className={styles.controlTitle}>Фиксация условий</div>
          <div className={styles.controlDesc}>Состояние системы</div>
        </div>
        <div className={styles.controlItem}>
          <div className={styles.controlTitle}>Проверка корректности</div>
          <div className={styles.controlDesc}>Выполнения операций</div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolSection; 