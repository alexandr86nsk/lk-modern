import React from 'react';

import AvatarIcon from '@assets/icons/avatar.svg';
import LogoutIcon from '@assets/icons/power_settings_new-24px.svg';
import SettingsIcon from '@assets/icons/settings.svg';

export const userMenu = [
  {
    id: '0',
    title: 'Профиль',
    icon: <AvatarIcon />,
    link: '/user',
  },
  {
    id: '1',
    title: 'Настройки',
    icon: <SettingsIcon />,
    link: '/settings',
  },
  {
    id: '2',
    title: 'Выйти',
    icon: <LogoutIcon />,
    type: 'logout',
  },
];
