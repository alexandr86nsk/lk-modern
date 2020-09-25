import React from 'react';
import ReportsIcon from '../../static/images/insert_chart_outlined-24px.svg';
import ZoneIcon from '../../static/images/language-24px.svg';
import SettingsIcon from '../../static/images/settings-24px.svg';
import MonitoringIcon from '../../static/images/tv-24px.svg';

const UISidebarList = [
  {
    id: 0,
    title: 'Меню',
    icon: <SettingsIcon />,
    items: [
      {
        id: 0,
        title: 'Кампании',
        link: '/briefcases',
        icon: <ZoneIcon />,
      },
      {
        id: 1,
        title: 'Настройки',
        link: '/settings',
        icon: <SettingsIcon />,
      },
      {
        id: 2,
        title: 'Мониторинг',
        link: '/reports',
        icon: <MonitoringIcon />,
      },
      {
        id: 2,
        title: 'Отчеты',
        link: '/reports',
        icon: <ReportsIcon />,
      },
    ],
  },
];

export default UISidebarList;
