import { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',

    themes: {
      default: 'light',
      list: [
        {
          name: 'light',
          color: '#fff',
          class: Theme.LIGHT,
        },
        {
          name: 'dark',
          color: '#000',
          class: Theme.DARK,
        },
        {
          name: 'orange',
          color: '#ffb005',
          class: Theme.ORANGE,
        },
      ],
    },
  },
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    SuspenseDecorator,
    withThemeByClassName({
      themes: {
        light: Theme.LIGHT,
        dark: Theme.DARK,
        orange: Theme.ORANGE,
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
