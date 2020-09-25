import React from 'react';
import MainTab from './tabs/MainTab/MainTab';
// import RecallTab from './tabs/RecallTab/RecallTab';
// import TimeZoneTab from './tabs/TimeZoneTab/TimeZoneTab';
// import ArchiveTab from './tabs/ArchiveTab/ArchiveTab';

const settingsTabs = [
  {
    id: 0,
    title: 'Основные',
    item: <MainTab />,
  },
/*  {
    id: 1,
    title: 'Настройки перезвона',
    item: <RecallTab />,
  },
  {
    id: 2,
    title: 'Настройки часовых поясов',
    item: <TimeZoneTab />,
  },
  {
    id: 3,
    title: 'Настройки Групп Очереди Операторов',
    item: <ArchiveTab />,
  },*/
];

export default settingsTabs;
