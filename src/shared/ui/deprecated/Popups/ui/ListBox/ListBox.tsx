import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib';
import { DropdownDirection } from '@/shared/types/ui';

import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';

import popupStyles from '../../styles/popup.module.scss';
import * as styles from './ListBox.module.scss';

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

/**
 * @deprecated
 */
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
        className={classNames('', {}, [className, popupStyles.popup])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListBox.Button as="div" className={styles.trigger}>
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
                    [popupStyles.active]: active,
                    [popupStyles.disabled]: item.disabled,
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
