import path from 'path';
import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import { StorybookConfig } from '@storybook/react-webpack5';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

const getAbsolutePath = (packageName: string): any =>
  path.dirname(require.resolve(path.join(packageName, 'package.json')));

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],

  framework: getAbsolutePath('@storybook/react-webpack5'),

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-addon-mock'),
  ],

  docs: {
    autodocs: false,
  },

  webpackFinal: async (config: Configuration) => {
    const paths: BuildPaths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      locales: '',
      buildLocales: '',
    };
    config.resolve!.modules!.push(paths.src);
    config.resolve!.extensions!.push('.ts', '.tsx');
    config!.resolve!.alias = {
      ...config.resolve?.alias,
      '@': paths.src,
    };

    // @ts-ignore
    config.module!.rules = config.module.rules.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    });

    config.module!.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module!.rules.push(buildCssLoader(true));

    config.plugins?.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );

    return config;
  },
};

export default config;
