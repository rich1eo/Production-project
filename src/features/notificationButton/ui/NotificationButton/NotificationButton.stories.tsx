import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationButton } from './NotificationButton';

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
