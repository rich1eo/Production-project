import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginForm from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {},
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = args => (
  <LoginForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    loginFrom: { username: '123', password: '123' },
  }),
];

export const WithError = Template.bind({});
WithError.args = {};
WithError.decorators = [
  StoreDecorator({
    loginFrom: {
      username: '123',
      password: '123',
      error: 'Wrong password or username',
    },
  }),
];

export const IsLoading = Template.bind({});
IsLoading.args = {};
IsLoading.decorators = [
  StoreDecorator({
    loginFrom: {
      isLoading: true,
    },
  }),
];
