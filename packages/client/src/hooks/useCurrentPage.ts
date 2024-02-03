import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

export enum PageRoute {
  Home = '/',
  Giveaways = '/giveaways',
  NotFound = '/404',
}

export enum PageTitle {
  Home = 'Home',
  Giveaways = 'Giveaways',
  NotFound = 'Not Found',
}

export const useCurrentPage = (): [PageTitle, PageRoute] => {
  const { pathname } = useLocation();

  return useMemo(() => {
    switch (pathname) {
      case PageRoute.Home:
        return [PageTitle.Home, PageRoute.Home];

      case PageRoute.Giveaways:
        return [PageTitle.Giveaways, PageRoute.Giveaways];

      default:
        return [PageTitle.NotFound, PageRoute.NotFound];
    }
  }, [pathname]);
};
