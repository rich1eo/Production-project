import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { NavBar } from 'widgets/NavBar';
import { SideBar } from 'widgets/SideBar';
import { getUserInited, userActions } from 'entities/User';

import { AppRouter } from './providers/router';

export default function App() {
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

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
