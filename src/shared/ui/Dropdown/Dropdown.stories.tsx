import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>123</Button>,
  items: [
    {
      content: 'first',
    },
    {
      content: 'second',
    },
    {
      content: 'third',
    },
  ],
};
