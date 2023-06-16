import { ThemeProvider } from '@emotion/react';
import React, { useContext, useEffect } from 'react';
import { createTheme } from '../theme';

export interface IThemeContext {
  mode: 'dark' | 'light';
  toggleColorMode: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>(localStorage.getItem('colorMode') === 'dark' ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        localStorage.setItem('colorMode', mode === 'light' ? 'dark' : 'light')
      },
      mode,
    }),
    [mode],
  )

  const theme = React.useMemo(() => createTheme(mode), [mode])

  useEffect(() => {
    if (!localStorage.getItem('colorMode')) {
      localStorage.setItem('colorMode', mode === 'light' ? 'dark' : 'light')
    }
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={colorMode}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);