import React from 'react';
import styles from './SlideHeading.module.scss';
import { useTheme } from '../../contexts/ThemeContext';

interface SlideHeadingProps {
  children: React.ReactNode;
  size?: 'medium' | 'small';
}

export const SlideHeading: React.FC<SlideHeadingProps> = ({ children, size = 'medium' }) => {
  const { isPrintTheme } = useTheme();

  const classNames = [
    styles.slideHeader,
    size === 'small' ? styles.small : '',
    isPrintTheme ? styles.printTheme : ''
  ].filter(Boolean).join(' ');

  return (
    <header className={classNames}>
      <h1>{children}</h1>
    </header>
  );
}; 