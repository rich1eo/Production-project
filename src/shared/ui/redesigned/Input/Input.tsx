import {
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';
import { Text } from '../Text';

import * as styles from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;
type InputSize = 's' | 'm' | 'l';

type InputProps = {
  className?: string;
  value?: string | number;
  label?: string;
  autofocus?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
} & HTMLInputProps;

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    label,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    size = 'm',
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handelBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const mods: Mods = {
    [styles.readonly]: readonly,
    [styles.focused]: isFocused,
    [styles.withAddonLeft]: !!addonLeft,
    [styles.withAddonRight]: !!addonRight,
  };

  const input = (
    <div
      className={classNames(styles.InputWrapper, mods, [
        className,
        styles[size],
      ])}
    >
      {addonLeft && <div className={styles.addonLeft}>{addonLeft}</div>}
      <input
        ref={ref}
        className={classNames(styles.input)}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handelBlur}
        readOnly={readonly}
        placeholder={placeholder}
        {...otherProps}
      />
      {addonRight && <div className={styles.addonRight}>{addonRight}</div>}
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={label} />
        {input}
      </HStack>
    );
  }

  return input;
});
