import { Suspense } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { NavBar } from 'widgets/NavBar';
import { SideBar } from 'widgets/SideBar';

export default function App() {
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
