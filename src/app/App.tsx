import { Suspense, useEffect } from 'react';

import { classNames } from '@/shared/lib';
import { NavBar } from '@/widgets/NavBar';
import { SideBar } from '@/widgets/SideBar';
import { initAuthData, useUserInited } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeature } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts';

import { AppRouter } from './providers/router';
import { useAppToolbar } from './lib/useAppToolbar';

export default function App() {
  const dispatch = useAppDispatch();
  const inited = useUserInited();
  const { theme } = useTheme();
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <div id="app" className={classNames('app_redesigned', {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              header={<NavBar />}
              content={<AppRouter />}
              sidebar={<SideBar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div id="app" className={classNames('app', {}, [theme])}>
          <Suspense fallback="">
            <NavBar />
            <main className="content-page">
              <SideBar className="no-shrink" />
              <AppRouter />
            </main>
          </Suspense>
        </div>
      }
    />
  );
}
