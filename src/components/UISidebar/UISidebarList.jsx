import React from 'react';
import ReportsIcon from '../../static/images/insert_chart_outlined-24px.svg';
import ZoneIcon from '../../static/images/language-24px.svg';
import SettingsIcon from '../../static/images/settings-24px.svg';
import CalendarIcon from '../../static/images/date_range-24px.svg';
import TestIcon from '../../static/images/business_center-24px.svg';

const UISidebarList = [
  {
    id: 0,
    title: 'Меню',
    icon: <SettingsIcon />,
    items: [
      {
        id: 0,
        title: 'Список зон',
        link: '/zone',
        icon: <ZoneIcon />,
      },
      {
        id: 1,
        title: 'Админцентр',
        link: '/settings',
        icon: <SettingsIcon />,
      },
      {
        id: 2,
        title: 'Отчетность',
        link: '/reports',
        icon: <ReportsIcon />,
      },
      {
        id: 3,
        title: 'Календарь',
        link: '/calendar',
        icon: <CalendarIcon />,
      },
      {
        id: 4,
        title: 'Тест',
        link: '/test',
        icon: <TestIcon />,
      },
    ],
  },
];
export default UISidebarList;
