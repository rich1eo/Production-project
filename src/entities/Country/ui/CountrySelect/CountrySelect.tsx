import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { ListBox } from '@/shared/ui';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

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

export const CountrySelect = memo(
  ({ className, value, readonly, onChange }: CountrySelectProps) => {
    const { t } = useTranslation('profile');

    const handleChange = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange]
    );

    return (
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
    );
  }
);
