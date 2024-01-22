import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../model/types/currency';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  readonly?: boolean;
  onChange?: (value: Currency) => void;
}

const options = [
  {
    value: Currency.RUB,
    content: Currency.RUB,
  },
  {
    value: Currency.USD,
    content: Currency.USD,
  },
  {
    value: Currency.EUR,
    content: Currency.EUR,
  },
];

export const CurrencySelect = memo(
  ({ className, value, readonly, onChange }: CurrencySelectProps) => {
    const { t } = useTranslation('profile');

    const handleChange = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );

    return (
      <ListBox
        className={className}
        onChange={handleChange}
        value={value}
        items={options}
        defaultValue={t('Currency')}
        readonly={readonly}
        direction="top right"
        label={t('Currency')}
      />
    );
  }
);
