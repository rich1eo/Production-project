import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

import styles from './Dropdown.module.scss';
import popupStyles from '../../styles/popup.module.scss';

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

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction]];

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
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => {
            return (
              <button
                type="button"
                onClick={item.onClick}
                className={classNames(styles.item, {
                  [popupStyles.active]: active,
                })}
                disabled={item.disabled}
                key={item.content as string}
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
                key={item.href}
                disabled={item.disabled}
                className={styles.link}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} key={item.href} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
