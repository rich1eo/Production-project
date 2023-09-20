import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import Text, { TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title Lorem',
  text: 'Text Lorem',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title Lorem',
  text: 'Text Lorem',
  theme: TextTheme.ERROR,
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  title: 'Title Lorem',
  text: 'Text Lorem',
  theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title Lorem',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Text Lorem',
};

export const Dark = Template.bind({});
Dark.args = {
  title: 'Title Lorem',
  text: 'Text Lorem',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title Lorem',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Text Lorem',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];