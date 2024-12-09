import React, { createContext, useState, useMemo, useContext, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, alpha, PaletteMode } from '@mui/material';
import { Admin } from '../models/Admin';

interface ContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  admin: Admin | null;
  isLoggedIn: boolean;
  setAdmin: (admin: Admin | null) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ProviderWithContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial mode and admin from localStorage
  const getInitialMode = (): PaletteMode => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark' ? 'dark' : 'light';
  };

  const getInitialAdmin = (): Admin | null => {
    const savedAdmin = localStorage.getItem('admin');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  };

  const [mode, setMode] = useState<PaletteMode>(getInitialMode);
  const [admin, setAdminState] = useState<Admin | null>(getInitialAdmin);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getInitialAdmin());
  const violetBase = '#7F00FF';

  useEffect(() => {
    const hours = new Date().getHours();
    if (!localStorage.getItem('theme')) {
      if (hours >= 6 && hours < 18) {
        setMode('light'); // Daytime: Light mode
      } else {
        setMode('dark'); // Nighttime: Dark mode
      }
    }
  }, []);

  // Persist theme mode to localStorage
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Persist admin state to localStorage
  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('admin');
      setIsLoggedIn(false);
    }
  }, [admin]);

  const setAdmin = (newAdmin: Admin | null) => {
    setAdminState(newAdmin);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: alpha(violetBase, 0.7),
                  light: alpha(violetBase, 0.5),
                  dark: alpha(violetBase, 0.9),
                },
                background: {
                  default: '#FAFAFA',
                  paper: '#FFFFFF',
                },
              }
            : {
                primary: {
                  main: '#E0C2FF',
                },
                background: {
                  default: '#121212',
                  paper: '#1E1E1E',
                },
              }),
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Context.Provider value={{ mode, toggleTheme, admin, setAdmin, isLoggedIn }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ProviderWithContext');
  }
  return context;
};
