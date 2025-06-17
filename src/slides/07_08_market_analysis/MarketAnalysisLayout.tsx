import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { SlideHeading } from '../../components/SlideHeading';
import './MarketAnalysisLayout.scss';

export const MarketAnalysisLayout: React.FC = () => {
  const location = useLocation();
  const { isPrintTheme } = useTheme();

  const isDeepDiveSlide = location.pathname === '/market-analysis/trends-deep-dive';

  const getSlideTitle = () => {
    if (isDeepDiveSlide) {
      return 'УГЛУБЛЕННЫЙ АНАЛИЗ ТРЕНДОВ И ПЕРСПЕКТИВ РАЗВИТИЯ';
    }
    return 'ПОДТВЕРЖДЕНИЕ АКТУАЛЬНОСТИ ИССЛЕДОВАНИЯ';
  };

  return (
    <div className={`market-analysis-layout ${isPrintTheme ? 'print-theme' : ''}`}>
      <SlideHeading size="small">{getSlideTitle()}</SlideHeading>
      <main className="market-analysis-content-outlet">
        <Outlet />
      </main>
    </div>
  );
}; 