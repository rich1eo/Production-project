import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextRedesigned, TextTheme, VStack } from '@/shared/ui';
import { ProfileCard } from '@/entities/Profile';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';

import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { ValidationProfileError } from '../../model/consts/consts';
import { ToggleFeature } from '@/shared/lib/features';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducerList = {
  profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validationErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidationProfileError.INCORRECT_USER_DATA]: t(
      'First name and second name should be filled',
    ),
    [ValidationProfileError.INCORRECT_AGE]: t('Age should be not float number'),
    [ValidationProfileError.NO_DATA]: t('Profile can not be empty'),
    [ValidationProfileError.SERVER_ERROR]: t('Server error'),
    [ValidationProfileError.INCORRECT_COUNTRY]: t('Incorrect country'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const handleChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ firstName: value || '' }));
    },
    [dispatch],
  );

  const handleChangeSecondName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ secondName: value || '' }));
    },
    [dispatch],
  );

  const handleChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }));
    },
    [dispatch],
  );

  const handleChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }));
    },
    [dispatch],
  );

  const handleChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }));
    },
    [dispatch],
  );

  const handleChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency: currency || '' }));
    },
    [dispatch],
  );

  const handleChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country: country || '' }));
    },
    [dispatch],
  );

  const handleChangeAge = useCallback(
    (value?: string) => {
      if (!isNaN(+value!)) {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
      }
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap="8" max className={classNames('', {}, [className])}>
        <EditableProfileCardHeader />
        {validationErrors?.length &&
          validationErrors.map((err) => (
            <ToggleFeature
              name="isAppRedesigned"
              key={err}
              on={
                <TextRedesigned
                  variant="error"
                  text={validateErrorTranslates[err]}
                  data-testid="EditableProfileCard.Error"
                />
              }
              off={
                <Text
                  theme={TextTheme.ERROR}
                  text={validateErrorTranslates[err]}
                  data-testid="EditableProfileCard.Error"
                />
              }
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeFirstName={handleChangeFirstName}
          onChangeSecondName={handleChangeSecondName}
          onChangeAge={handleChangeAge}
          onChangeCity={handleChangeCity}
          onChangeAvatar={handleChangeAvatar}
          onChangeUsername={handleChangeUsername}
          onChangeCurrency={handleChangeCurrency}
          onChangeCountry={handleChangeCountry}
          readonly={readonly}
        />
      </VStack>
    </DynamicModuleLoader>
  );
});
