import { Suspense, useEffect } from 'react';

import { classNames } from '@/shared/lib';
import { NavBar } from '@/widgets/NavBar';
import { SideBar } from '@/widgets/SideBar';
import { initAuthData, useUserInited } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppRouter } from './providers/router';
import { PageLoader } from '@/widgets/PageLoader';

export default function App() {
  const dispatch = useAppDispatch();
  const inited = useUserInited();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

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
