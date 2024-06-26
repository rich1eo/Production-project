import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames, useForceUpdate } from '@/shared/lib';
import {
  Button,
  ButtonRedesigned,
  ButtonTheme,
  Input,
  InputRedesigned,
  Text,
  TextRedesigned,
  TextTheme,
} from '@/shared/ui';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeature, toggleFeature } from '@/shared/lib/features';

import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

import * as styles from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginFrom: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const handleChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const handleChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const handleLoginClick = useCallback(async () => {
    const res = await dispatch(loginByUsername({ username, password }));

    if (res.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [onSuccess, dispatch, forceUpdate, password, username]);

  const loginFormClass = toggleFeature({
    name: 'isAppRedesigned',
    on: () => styles.LoginFormRedesigned,
    off: () => styles.LoginForm,
  });

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(loginFormClass, {}, [className])}>
        <ToggleFeature
          name="isAppRedesigned"
          on={
            <>
              <TextRedesigned title={t('Authorization form')} />
              <InputRedesigned
                autofocus
                type="text"
                placeholder={t('Username')}
                value={username}
                onChange={handleChangeUsername}
              />
              <InputRedesigned
                type="text"
                placeholder={t('Password')}
                value={password}
                onChange={handleChangePassword}
              />
              {error && (
                <TextRedesigned
                  title={t('Wrong username or password')}
                  variant="error"
                />
              )}
              <ButtonRedesigned
                variant="outline"
                onClick={handleLoginClick}
                disabled={isLoading}
                className={styles.signInBtn}
              >
                {t('Sign In')}
              </ButtonRedesigned>
            </>
          }
          off={
            <>
              <Text title={t('Authorization form')} />
              <Input
                autofocus
                type="text"
                placeholder={t('Username')}
                value={username}
                onChange={handleChangeUsername}
              />
              <Input
                type="text"
                placeholder={t('Password')}
                value={password}
                onChange={handleChangePassword}
              />
              {error && (
                <Text
                  title={t('Wrong username or password')}
                  theme={TextTheme.ERROR}
                />
              )}
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={handleLoginClick}
                disabled={isLoading}
              >
                {t('Sign In')}
              </Button>
            </>
          }
        />
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
