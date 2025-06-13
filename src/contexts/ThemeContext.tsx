import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'color' | 'print';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isColorTheme: boolean;
  isPrintTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('color');

  const toggleTheme = () => {
    setTheme(prev => prev === 'color' ? 'print' : 'color');
  };

  const value = {
    theme,
    toggleTheme,
    isColorTheme: theme === 'color',
    isPrintTheme: theme === 'print',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 