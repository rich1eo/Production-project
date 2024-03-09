import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Page } from './Page';

export default {
  title: 'widgets/Page',
  component: Page,
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
