import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';

import { classNames } from '@/shared/lib';
import { DropdownDirection } from '@/shared/types/ui';

import { Button } from '../../../Button/Button';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

import * as popupStyles from '../../styles/popup.module.scss';
import * as styles from './ListBox.module.scss';
import { Icon } from '../../../Icon';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
  selected?: true;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
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

  const optionsClasses = [mapDirectionClass[direction], popupStyles.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

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
          <Button
            disabled={readonly}
            variant="filled"
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
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
                    [popupStyles.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
