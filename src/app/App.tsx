import { Suspense, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { NavBar } from 'widgets/NavBar';
import { SideBar } from 'widgets/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';

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
        <div className="content-page">
          <SideBar className="no-shrink" />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}
