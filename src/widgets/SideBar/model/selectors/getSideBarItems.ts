import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';

import { SideBarItemType } from '../types/sidebar';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
  const sideBarItemsList: SideBarItemType[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: 'Home',
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: 'About us',
    },
  ];

  if (userData) {
    sideBarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        Icon: ProfileIcon,
        text: 'Profile',
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: ArticlesIcon,
        text: 'Articles',
        authOnly: true,
      }
    );
  }

  return sideBarItemsList;
});
