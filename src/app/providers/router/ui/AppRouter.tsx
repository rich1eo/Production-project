import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AppRouterProps,
  routeConfig,
} from 'shared/config/routeConfig/routeConfig';
import PageLoader from 'widgets/PageLoader/PageLoader';
import { RequireAuth } from './RequireAuth';

function AppRouter() {
  const renderWithWrapper = useCallback((route: AppRouterProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <main className="page-wrapper">
            {route.authOnly ? (
              <RequireAuth>{route.element as JSX.Element}</RequireAuth>
            ) : (
              route.element
            )}
          </main>
        }
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
}

export default memo(AppRouter);
