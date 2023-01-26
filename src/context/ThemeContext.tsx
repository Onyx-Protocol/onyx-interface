import noop from 'noop-ts';
import React, { useCallback, useEffect, useState } from 'react';

export interface ThemeContextValue {
  mode: string;
  updateThemeMode: (mode: string) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  mode: 'dark',
  updateThemeMode: noop,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    let mode = localStorage.getItem('themeMode');
    if (!mode) {
      mode = 'dark';
      localStorage.setItem('themeMode', 'dark');
    }
    setThemeMode(mode);
  }, []);

  const updateThemeMode = useCallback(
    (mode: string) => {
      setThemeMode(mode);
      localStorage.setItem('themeMode', mode);
    },
    [setThemeMode],
  );

  return (
    <ThemeContext.Provider
      value={{
        mode: themeMode,
        updateThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
