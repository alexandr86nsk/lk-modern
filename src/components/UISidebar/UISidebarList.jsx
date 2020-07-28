import React from 'react';
import BriefIcon from '../../static/images/work-24px.svg';
import SettingsIcon from '../../static/images/settings.svg';
import ReportIcon from '../../static/images/tv-24px.svg';
import ReportsIcon from '../../static/images/update-24px.svg';
import CircleIcon from '../../static/images/circle_outline.svg';
import SidebarItem from "../../containers/TestPage/SidebarItem";

const UISidebarList = [
  {
    id: 0,
    title: 'Кампании',
    link: '/briefcase',
    icon: <BriefIcon />,
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
    icon: <ReportIcon />,
  },
  {
    id: 3,
    title: 'Отчеты',
    link: '/test',
    icon: <ReportsIcon />,
    items: [
      {
        id: 0,
        title: 'Детали задания',
        icon: <CircleIcon />,
        component: (item) => (
          <SidebarItem key={item.id} {...item} />
        )
      },
      {
        id: 1,
        title: 'Статус задания',
        icon: <CircleIcon />,
        component: (item) => (
          <SidebarItem key={item.id} {...item} />
        )
      },
      {
        id: 2,
        title: 'Динамическая история задания',
        icon: <CircleIcon />,
        component: (item) => (
          <SidebarItem key={item.id} {...item} />
        )
      },
      {
        id: 3,
        title: 'Эффективность работы сотрудников',
        icon: <CircleIcon />,
        component: (item) => (
          <SidebarItem key={item.id} {...item} />
        )
      },
    ],
  },
];

export default UISidebarList;
