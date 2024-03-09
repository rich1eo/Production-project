import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationItem } from './NotificationItem';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

export const NotificationWithoutLink = Template.bind({});
NotificationWithoutLink.args = {
  notification: {
    id: '1',
    description: 'This is a notification description',
    title: 'Notification title',
  },
};

export const NotificationWithLink = Template.bind({});
NotificationWithLink.args = {
  notification: {
    id: '1',
    description: 'This is a notification description',
    title: 'Notification title',
    href: '#',
  },
};
