import { ComponentType } from 'react';

import { useUserJsonSettings } from '@/entities/User';

import { ThemeProvider } from './ThemeProvider';

export const withTheme = (Component: ComponentType) => {
  return () => {
    const { theme: defaultTheme } = useUserJsonSettings();

    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    );
  };
};
