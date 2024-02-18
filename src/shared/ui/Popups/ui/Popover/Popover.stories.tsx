import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '@/shared/ui/Button/Button';

export default {
  title: 'shared/Popover',
  component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>123</Button>,
  children: (
    <div style={{ padding: '1rem' }}>
      <ul>
        <li>123123123123</li>
        <li>113123123123</li>
        <li>123123123123</li>
        <li>123123123123</li>
      </ul>
    </div>
  ),
  direction: 'bottom right',
};
