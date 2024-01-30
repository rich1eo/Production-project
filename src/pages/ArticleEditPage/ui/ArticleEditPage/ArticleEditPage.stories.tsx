import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleEditPage from './ArticleEditPage';

export default {
  title: 'pages/ArticleEditPage/ArticleEditPage',
  component: ArticleEditPage,
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => (
  <ArticleEditPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
