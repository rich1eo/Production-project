import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { ListBox, ListBoxRedesigned } from '@/shared/ui';

import { Country } from '../../model/types/country';
import { ToggleFeature } from '@/shared/lib/features';

const options = [
  {
    value: Country.Russia,
    content: Country.Russia,
  },
  {
    value: Country.Armenia,
    content: Country.Armenia,
  },
  {
    value: Country.Belarus,
    content: Country.Belarus,
  },
  {
    value: Country.Georgia,
    content: Country.Georgia,
  },
  {
    value: Country.Kazakhstan,
    content: Country.Kazakhstan,
  },
  {
    value: Country.Ukraine,
    content: Country.Ukraine,
  },
];

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, readonly, onChange } = props;
  const { t } = useTranslation('profile');

  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <ListBoxRedesigned
          className={classNames('', {}, [className])}
          defaultValue={t('Country')}
          items={options}
          value={value}
          onChange={handleChange}
          readonly={readonly}
          direction="top left"
          label={t('Country')}
        />
      }
      off={
        <ListBox
          className={classNames('', {}, [className])}
          defaultValue={t('Country')}
          items={options}
          value={value}
          onChange={handleChange}
          readonly={readonly}
          direction="top right"
          label={t('Country')}
        />
      }
    />
  );
});
