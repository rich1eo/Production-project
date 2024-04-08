import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tabs } from './Tabs';

export default {
  title: 'shared/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    { value: 'tab1', content: 'content1' },
    { value: 'tab2', content: 'content2' },
    { value: 'tab3', content: 'content3' },
  ],
  value: 'tab2',
  onTabClick: action('onTabClick'),
};
