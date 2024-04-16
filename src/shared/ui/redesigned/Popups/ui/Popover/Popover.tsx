import { ReactNode, memo } from 'react';
import { Popover as HPopover } from '@headlessui/react';

import { DropdownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib';

import { mapDirectionClass } from '../../styles/consts';

import * as styles from './Popover.module.scss';
import * as popupStyles from '../../styles/popup.module.scss';

interface PopoverProps {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  direction?: DropdownDirection;
}

export const Popover = memo((props: PopoverProps) => {
  const { children, className, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction], popupStyles.menu];

  return (
    <HPopover className={classNames('', {}, [className, popupStyles.popup])}>
      <HPopover.Button as="div" className={popupStyles.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(styles.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});
