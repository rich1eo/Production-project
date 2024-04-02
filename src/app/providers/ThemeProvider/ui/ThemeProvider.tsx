import { ReactNode, useEffect, useMemo, useState } from 'react';

import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useUserJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const { theme: defaultTheme = Theme.LIGHT } = useUserJsonSettings();
  const [isThemeInited, setIsThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
