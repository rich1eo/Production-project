import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook-avatar.jpeg';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    age: 23,
    firstName: 'Test',
    secondName: 'User',
    country: Country.Ukraine,
    username: 'admin',
    currency: Currency.EUR,
    city: 'Kiev',
    avatar: avatar,
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'true',
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};
