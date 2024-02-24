import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleRating from './ArticleRating';

export default {
  title: 'features/ArticleRating',
  component: ArticleRating,
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => (
  <ArticleRating {...args} />
);

export const WithRating = Template.bind({});
WithRating.args = {
  articleId: '1',
};
WithRating.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
WithRating.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?articleId=1&userId=1`,
      method: 'GET',
      status: 200,
      response: [
        {
          rate: 4,
        },
      ],
    },
  ],
};

export const WithoutRating = Template.bind({});
WithoutRating.args = {
  articleId: '1',
};
WithoutRating.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
WithoutRating.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?articleId=1&userId=1`,
      method: 'GET',
      status: 200,
      response: [],
    },
  ],
};
