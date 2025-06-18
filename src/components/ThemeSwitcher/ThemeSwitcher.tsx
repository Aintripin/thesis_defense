import React from 'react';
import { Monitor, Printer } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, isColorTheme } = useTheme();

  return (
    <button
      className={`${styles.themeSwitcher} ${isColorTheme ? styles.colorTheme : styles.printTheme}`}
      onClick={toggleTheme}
      title={`Switch to ${isColorTheme ? 'Print' : 'Color'} mode`}
    >
      <div className={styles.iconContainer}>
        {isColorTheme ? (
          <Printer size={20} />
        ) : (
          <Monitor size={20} />
        )}
      </div>
      <span className={styles.label}>
        {isColorTheme ? 'Print Mode' : 'Color Mode'}
      </span>
    </button>
  );
};

export default ThemeSwitcher; 