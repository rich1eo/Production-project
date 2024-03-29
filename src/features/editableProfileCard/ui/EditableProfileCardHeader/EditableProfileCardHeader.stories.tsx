import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/editableProfileCard/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => (
  <EditableProfileCardHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
