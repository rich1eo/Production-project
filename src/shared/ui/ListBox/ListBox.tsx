import { Fragment, ReactNode, memo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { DropdownDirection } from 'shared/types/ui';

import styles from './ListBox.module.scss';
import { HStack } from '../Stack';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': styles.optionsBottomLeft,
  'bottom right': styles.optionsBottomRight,
  'top left': styles.optionsTopLeft,
  'top right': styles.optionsTopRight,
};

export const ListBox = memo((props: ListBoxProps) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom left',
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{label + '>'}</span>}
      <HListBox
        as="div"
        className={classNames(styles.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListBox.Button className={styles.trigger} disabled={readonly}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(styles.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              as={Fragment}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(styles.item, {
                    [styles.active]: active,
                    [styles.disabled]: item.disabled,
                  })}
                >
                  {selected && '>'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
});
