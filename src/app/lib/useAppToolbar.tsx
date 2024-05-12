import { ReactNode } from 'react';

import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

export const useAppToolbar = () => {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactNode> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
};
