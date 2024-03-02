import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ModalLight = Template.bind({});
ModalLight.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint, consequuntur quidem laboriosam iusto id praesentium. Sint, id a. Consectetur, harum. Iste, quod minus itaque ipsum quis doloremque laboriosam maiores?',
};
