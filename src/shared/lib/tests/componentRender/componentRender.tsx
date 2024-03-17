import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';

import { Theme } from '@/shared/const/theme';
import i18n from '@/shared/config/i18n/i18nForTests';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

import '@/app/styles/index.scss';

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;
  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export default function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {}
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
