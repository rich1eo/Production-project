import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox, ListBoxRedesigned } from '@/shared/ui';
import { Currency } from '../../model/types/currency';
import { ToggleFeature } from '@/shared/lib/features';

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

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, readonly, onChange } = props;
  const { t } = useTranslation('profile');

  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <ListBoxRedesigned
          className={className}
          onChange={handleChange}
          value={value}
          items={options}
          defaultValue={t('Currency')}
          readonly={readonly}
          direction="top left"
          label={t('Currency')}
        />
      }
      off={
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
      }
    />
  );
});
