import React from 'react';
import styles from './SlideWrapper.module.scss';

interface SlideWrapperProps {
  children: React.ReactNode;
}

export const SlideWrapper: React.FC<SlideWrapperProps> = ({ children }) => {
  return <div className={styles.slideWrapper}>{children}</div>;
}; 