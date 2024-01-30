import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
  <ArticleRecommendationsList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
