import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import styles from './Input.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  autofocus?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

/**
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    ...otherProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const caretIsVisible = isFocused && !readonly;

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const handelBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const mods: Mods = {
    [styles.readonly]: readonly,
  };

  return (
    <div className={classNames(styles.InputWrapper, {}, [className])}>
      {placeholder && <div className="placeholder">{`${placeholder}>`}</div>}
      <div className={styles.caretWrapper}>
        <input
          ref={ref}
          className={classNames(styles.input, mods)}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handelBlur}
          onSelect={handleSelect}
          readOnly={readonly}
          {...otherProps}
        />
        {caretIsVisible && (
          <span
            className={styles.caret}
            style={{ left: `${caretPosition * 12}px` }}
          />
        )}
      </div>
    </div>
  );
});
