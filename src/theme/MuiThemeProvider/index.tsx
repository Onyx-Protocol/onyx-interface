import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactNode, useMemo } from 'react';

import 'assets/styles/normalize.scss';
import { ThemeContext } from 'context/ThemeContext';

import { getTheme } from './muiTheme';

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  const { mode } = React.useContext(ThemeContext);
  const mainTheme = useMemo(() => getTheme(mode === 'dark' ? 0 : 1), [mode]);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
