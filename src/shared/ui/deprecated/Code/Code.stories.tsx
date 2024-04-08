import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Code } from './Code';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Code',
  component: Code,
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text:
    // eslint-disable-next-line quotes
    "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  text:
    // eslint-disable-next-line quotes
    "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryOrange = Template.bind({});
PrimaryOrange.args = {
  text:
    // eslint-disable-next-line quotes
    "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
};
PrimaryOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
