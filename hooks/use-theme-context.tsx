import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: Theme;
  changeTheme: ChangeTheme;
}

type Theme = 'light' | 'dark';

type ChangeTheme = (selectedTheme: Theme) => void;

const ThemeContext = createContext({} as ThemeContextType);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeContextProvider: React.FC = ({ children }) => {
  const isPreferDarkColorScheme = typeof window === 'object' && window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState<Theme>(isPreferDarkColorScheme ? 'dark' : 'light');

  const changeTheme: ChangeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
