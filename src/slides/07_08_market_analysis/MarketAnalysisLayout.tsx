import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import './MarketAnalysisLayout.scss';

export const MarketAnalysisLayout: React.FC = () => {
  const location = useLocation();
  const { isPrintTheme } = useTheme();

  const isDeepDiveSlide = location.pathname === '/market-analysis/trends-deep-dive';

  // Determine the appropriate title based on the current slide
  const getSlideTitle = () => {
    if (isDeepDiveSlide) {
      return 'УГЛУБЛЕННЫЙ АНАЛИЗ ТРЕНДОВ И ПЕРСПЕКТИВ РАЗВИТИЯ';
    }
    return 'ПОДТВЕРЖДЕНИЕ АКТУАЛЬНОСТИ ИССЛЕДОВАНИЯ';
  };

  const headerVisibleState = {
    opacity: 1,
    y: 0,
    height: 'auto',
    marginTop: 0,
    marginBottom: 0,
  };

  const headerHiddenState = {
    opacity: 0,
    y: '-110%',
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  };

  const contentOutletVisibleHeaderState = {
    paddingTop: 20,
  };

  const contentOutletHiddenHeaderState = {
    paddingTop: 25,
  };

  return (
    <div className={`market-analysis-layout ${isPrintTheme ? 'print-theme' : ''}`}>
      <motion.div
        className="slide-title-container-shared"
        style={{ overflow: 'hidden' }}
        initial={headerVisibleState}
        animate={headerVisibleState}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="slide-title-shared">{getSlideTitle()}</h1>
      </motion.div>
      <motion.main
        className="market-analysis-content-outlet"
        initial={contentOutletVisibleHeaderState}
        animate={contentOutletVisibleHeaderState}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}; 