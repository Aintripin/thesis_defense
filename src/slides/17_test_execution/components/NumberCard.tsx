import React from 'react';

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
    <div className={`number-card ${className}`}>
      <div className="big-number">{number}</div>
      <div className="number-label">{label}</div>
      <div className="calculation">{calculation}</div>
    </div>
  );
};

export default NumberCard; 