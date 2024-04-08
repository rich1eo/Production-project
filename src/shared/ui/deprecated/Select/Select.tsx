import { ChangeEvent, useMemo } from 'react';
import styles from './Select.module.scss';
import { classNames } from '@/shared/lib';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  readonly?: boolean;
  onChange?: (value: T) => void;
}

/**
 * @deprecated
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, readonly, onChange } = props;

  const optionList = useMemo(() => {
    return options?.map((opt) => {
      return (
        <option key={opt.value} className={styles.option} value={opt.value}>
          {opt.content}
        </option>
      );
    });
  }, [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  return (
    <div className={classNames(styles.wrapper, {}, [className])}>
      {label && <span className={styles.label}>{`${label}>`}</span>}
      <select
        className={styles.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionList}
      </select>
    </div>
  );
};
