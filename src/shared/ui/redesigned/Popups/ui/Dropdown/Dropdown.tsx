import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/lib';
import { DropdownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

import * as styles from './Dropdown.module.scss';
import * as popupStyles from '../../styles/popup.module.scss';

interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction], popupStyles.menu];

  return (
    <Menu
      as="div"
      className={classNames(styles.Dropdown, {}, [
        className,
        popupStyles.popup,
      ])}
    >
      <Menu.Button className={popupStyles.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => {
            return (
              <button
                type="button"
                onClick={item.onClick}
                className={classNames(styles.item, {
                  [popupStyles.active]: active,
                })}
                disabled={item.disabled}
              >
                {item.content}
              </button>
            );
          };

          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                key={`dropdown-key-${index}`}
                disabled={item.disabled}
                className={styles.link}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
              as={Fragment}
              key={`dropdown-key-${index}`}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
