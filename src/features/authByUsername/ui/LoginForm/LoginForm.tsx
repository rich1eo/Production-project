import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { loginActions, loginReducer } from '@/features/authByUsername';
import { loginByUsername } from '@/features/authByUsername';
import Text, { TextTheme } from '@/shared/ui/Text/Text';
import DynamicModuleLoader, {
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

import styles from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginFrom: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispath = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const handleChangeUsername = useCallback(
    (value: string) => {
      dispath(loginActions.setUsername(value));
    },
    [dispath]
  );

  const handleChangePassword = useCallback(
    (value: string) => {
      dispath(loginActions.setPassword(value));
    },
    [dispath]
  );

  const handleLoginClick = useCallback(async () => {
    const res = await dispath(loginByUsername({ username, password }));

    if (res.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [onSuccess, dispath, password, username]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(styles.LoginForm, {}, [className])}>
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
          theme={ThemeButton.OUTLINE}
          onClick={handleLoginClick}
          disabled={isLoading}
        >
          {t('Sign In')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
