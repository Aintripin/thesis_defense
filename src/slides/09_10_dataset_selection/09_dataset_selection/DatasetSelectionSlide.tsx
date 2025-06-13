import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Slide9Content } from './_Slide9Content';

export const DatasetSelectionSlide: React.FC = () => {
  const { isPrintTheme } = useTheme();

  return <Slide9Content isPrintTheme={isPrintTheme} />;
}; 