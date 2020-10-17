import React from 'react';
import ZoneIcon from '../../static/images/language-24px.svg';
import SettingsIcon from '../../static/images/settings-24px.svg';

const UISidebarList = [
  {
    id: 0,
    title: 'Меню',
    icon: <SettingsIcon />,
    items: [
      {
        id: 0,
        title: 'Проверка досье',
        link: '/dossier_check',
        icon: <ZoneIcon />,
      },
    ],
  },
];

export default UISidebarList;
