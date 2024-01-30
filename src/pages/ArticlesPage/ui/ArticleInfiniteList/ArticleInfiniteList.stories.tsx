import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleInfiniteList } from './ArticleInfiniteList';

export default {
  title: 'pages/ArticlePages/ArticleInfiniteList',
  component: ArticleInfiniteList,
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => (
  <ArticleInfiniteList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
