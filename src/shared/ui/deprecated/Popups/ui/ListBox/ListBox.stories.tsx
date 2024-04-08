import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  items: [
    { content: '123', value: '123' },
    { content: '123', value: '123' },
    { content: '123', value: '123' },
  ],
  value: '123',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  items: [
    { content: '123', value: '123' },
    { content: '123', value: '123' },
    { content: '123', value: '123' },
  ],
  direction: 'top left',
  value: '123',
};

export const TopRight = Template.bind({});
TopRight.args = {
  items: [
    { content: '123', value: '123' },
    { content: '123', value: '123' },
    { content: '123', value: '123' },
  ],
  direction: 'top right',
  value: '123',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  items: [
    { content: '123', value: '123' },
    { content: '123', value: '123' },
    { content: '123', value: '123' },
  ],
  direction: 'bottom left',
  value: '123',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  items: [
    { content: '123', value: '123' },
    { content: '123', value: '123' },
    { content: '123', value: '123' },
  ],
  direction: 'bottom right',
  value: '123',
};
