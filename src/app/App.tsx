import { Suspense, useEffect } from 'react';

import { classNames } from '@/shared/lib';
import { NavBar } from '@/widgets/NavBar';
import { SideBar } from '@/widgets/SideBar';
import { useUserActions, useUserInited } from '@/entities/User';

import { AppRouter } from './providers/router';

export default function App() {
  const inited = useUserInited();
  const { initAuthData } = useUserActions();

  useEffect(() => {
    initAuthData();
  }, [initAuthData]);

  return (
    <div className={classNames('app')}>
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
