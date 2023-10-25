import {
  ProfileCard,
  ValidationProfileError,
  fetchProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  profileActions,
  profileReducer,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import DynamicModuleLoader, {
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';
import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducerList = {
  profile: profileReducer,
};

export default function ProfilePage({ className }: ProfilePageProps) {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validationErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidationProfileError.INCORRECT_USER_DATA]: t(
      'First name and second name should be filled'
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
    [dispatch]
  );

  const handleChangeSecondName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ secondName: value || '' }));
    },
    [dispatch]
  );

  const handleChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }));
    },
    [dispatch]
  );

  const handleChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }));
    },
    [dispatch]
  );

  const handleChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }));
    },
    [dispatch]
  );

  const handleChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency: currency || '' }));
    },
    [dispatch]
  );

  const handleChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country: country || '' }));
    },
    [dispatch]
  );

  const handleChangeAge = useCallback(
    (value?: string) => {
      if (!isNaN(+value!)) {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
      }
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validationErrors?.length &&
          validationErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
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
      </Page>
    </DynamicModuleLoader>
  );
}
