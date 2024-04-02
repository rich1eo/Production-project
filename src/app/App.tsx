import { Suspense, useEffect } from 'react';

import { classNames } from '@/shared/lib';
import { NavBar } from '@/widgets/NavBar';
import { SideBar } from '@/widgets/SideBar';
import { useUserActions, useUserInited } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { AppRouter } from './providers/router';

export default function App() {
  const inited = useUserInited();
  const { theme } = useTheme();
  const { initAuthData } = useUserActions();

  useEffect(() => {
    initAuthData();
  }, [initAuthData]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <NavBar />
        <main className="content-page">
          <SideBar className="no-shrink" />
          {inited && <AppRouter />}
        </main>
      </Suspense>
    </div>
  );
}
