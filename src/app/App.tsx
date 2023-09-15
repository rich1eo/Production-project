import { Suspense, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { NavBar } from 'widgets/NavBar';
import { SideBar } from 'widgets/SideBar';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';

export default function App() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(userActions.initAuthData());
  }, [dispath]);

  return (
    <div className={classNames('app')}>
      <Suspense fallback="">
        <NavBar />
        <div className="content-page">
          <SideBar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
