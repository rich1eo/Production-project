import { getUserAuthData } from '@/entities/User';
import { useForceUpdate } from '@/shared/lib';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  HStack,
  ListBoxRedesigned,
  SkeletonRedesigned,
  TextRedesigned,
} from '@/shared/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = (props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation('settings');
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    {
      content: t('New'),
      value: 'new',
    },
    {
      content: t('Old'),
      value: 'old',
    },
  ];

  const handleChange = async (value: string) => {
    if (!authData) return;

    setIsLoading(true);
    await dispatch(
      updateFeatureFlag({
        userId: authData.id,
        newFeatures: { isAppRedesigned: value === 'new' ? true : false },
      }),
    ).unwrap();
    setIsLoading(false);
    forceUpdate();
  };

  return (
    <HStack gap="8">
      <TextRedesigned text={t('Interface variant')} />
      {isLoading ? (
        <SkeletonRedesigned width={100} height={40} border="12" />
      ) : (
        <ListBoxRedesigned
          onChange={handleChange}
          items={options}
          value={isAppRedesigned ? 'new' : 'old'}
          className={className}
        />
      )}
    </HStack>
  );
};
