import { memo, useCallback } from 'react';

import { Button, ButtonTheme, Icon } from '@/shared/ui';
import { classNames } from '@/shared/lib';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { ToggleFeature } from '@/shared/lib/features';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const handleToggle = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <Icon
          Svg={ThemeIcon}
          width={40}
          height={40}
          clickable
          onClick={handleToggle}
        />
      }
      off={
        <Button
          theme={ButtonTheme.CLEAR}
          className={classNames('', {}, [className])}
          onClick={handleToggle}
        >
          <ThemeIconDeprecated
            width={40}
            height={40}
            color="var(--inverted-primary-color)"
          />
        </Button>
      }
    />
  );
});
