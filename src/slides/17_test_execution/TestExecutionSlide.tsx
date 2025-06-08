import React from 'react';
import './TestExecutionSlide.scss';
import {
  ProtocolSection,
  StatsSection,
  NumberCard,
  MetricsCard
} from './components';

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
          {/* Left container with flexbox column */}
          <div className="left-container">
            {/* Protocol Section (Rectangle #1) */}
            <ProtocolSection />
            
            {/* 63 Card (Rectangle #2) */}
            <NumberCard
              number={63}
              label="Тестов на СУБД"
              calculation="21 конфигурация × 3 повторения"
              className="card-63"
            />
          </div>

          {/* Right container for L-shapes */}
          <div className="right-container">
            {/* L-shaped Stats Section (Blue L-shape) */}
            <StatsSection />
            
            {/* Metrics Card (Orange rectangle) */}
            <MetricsCard />
            
            {/* 189 Card (Brown rectangle) */}
            <NumberCard
              number={189}
              label="Общее количество тестов"
              calculation="3 СУБД × 6 workloads × 7 threads × 3 повторения"
              className="card-189"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionSlide; 