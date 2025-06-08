import React from 'react';
import styles from '../TestExecutionSlide.module.scss';

interface NumberCardProps {
  number: string | number;
  label: string;
  calculation: string;
  className?: string;
}

const NumberCard: React.FC<NumberCardProps> = ({ 
  number, 
  label, 
  calculation, 
  className = '' 
}) => {
  return (
    <div className={`${styles.numberCard} ${className}`}>
      <div className={styles.bigNumber}>{number}</div>
      <div className={styles.numberLabel}>{label}</div>
      <div className={styles.calculation}>{calculation}</div>
    </div>
  );
};

export default NumberCard; 