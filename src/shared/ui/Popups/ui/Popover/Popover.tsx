import { ReactNode, memo } from 'react';
import { Popover as HPopover } from '@headlessui/react';

import { DropdownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';

import { mapDirectionClass } from '../../styles/consts';

import styles from './Popover.module.scss';
import popupStyles from '../../styles/popup.module.scss';

interface PopoverProps {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  direction?: DropdownDirection;
}

export const Popover = memo((props: PopoverProps) => {
  const { children, className, trigger, direction = 'bottom right' } = props;

  const menuClasses = mapDirectionClass[direction];

  return (
    <HPopover
      className={classNames(styles.Popover, {}, [className, popupStyles.popup])}
    >
      <HPopover.Button as="div" className={popupStyles.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(styles.panel, {}, [menuClasses])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});
