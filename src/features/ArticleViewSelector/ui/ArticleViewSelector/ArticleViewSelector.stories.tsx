import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleViewSelector } from './ArticleViewSelector';

export default {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => (
  <ArticleViewSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
