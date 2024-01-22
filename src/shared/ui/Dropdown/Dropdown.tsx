import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Dropdown.module.scss';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': styles.optionsBottomLeft,
  'bottom right': styles.optionsBottomRight,
  'top left': styles.optionsTopLeft,
  'top right': styles.optionsTopRight,
};

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(styles.Dropdown, {}, [className])}>
      <Menu.Button className={styles.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => {
            return (
              <button
                type="button"
                onClick={item.onClick}
                className={classNames(styles.item, {
                  [styles.active]: active,
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
                key={item.href}
                disabled={item.disabled}
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
