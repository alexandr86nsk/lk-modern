import React from 'react';
import ReportsIcon from '../../static/images/insert_chart_outlined-24px.svg';
import ZoneIcon from '../../static/images/language-24px.svg';
import SettingsIcon from '../../static/images/settings-24px.svg';
import CalendarIcon from '../../static/images/date_range-24px.svg';

const UISidebarList = [
  {
    id: 0,
    title: 'Список зон',
    link: '/zone',
    icon: <ZoneIcon />,
    items: [],
  },
  {
    id: 1,
    title: 'Администрирование',
    link: '/settings',
    icon: <SettingsIcon />,
    items: [],
  },
  {
    id: 2,
    title: 'Отчетность',
    link: '/reports',
    icon: <ReportsIcon />,
    items: [],
  },
  {
    id: 3,
    title: 'Календарь',
    link: '/calendar',
    icon: <CalendarIcon />,
    items: [],
  },
  /*  {
      id: 6,
      title: 'Тест Субменю2',
      link: '',
      icon: <TestIcon />,
      items: [
        {
          id: 0,
          title: 'Субменю4',
          link: '/',
          icon: <CircleIcon />,
        },
      ],
    }, */
];
export default UISidebarList;
