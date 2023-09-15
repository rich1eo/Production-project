import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LoginForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { loginActions } from 'features/authByUsername/model/slice/loginSlice';
import { getLoginState } from 'features/authByUsername/model/selectors/getLoginState';
import { loginByUsername } from 'features/authByUsername/model/services/loginByUsername/loginByUsername';
import Text, { TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
  className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispath = useDispatch();
  const { username, password, isLoading, error } = useSelector(getLoginState);

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

  const handleLoginClick = useCallback(() => {
    dispath(loginByUsername({ username, password }));
  }, [dispath, password, username]);

  return (
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
        <Text title={t('Wrong username or password')} theme={TextTheme.ERROR} />
      )}
      <Button
        theme={ThemeButton.OUTLINE}
        onClick={handleLoginClick}
        disabled={isLoading}
      >
        {t('Sign In')}
      </Button>
    </div>
  );
});

export default LoginForm;
