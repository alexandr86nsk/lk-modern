import React from 'react';
import MainTab from './tabs/MainTab/MainTab';
import RecallTab from './tabs/RecallTab/RecallTab';
import TimeZoneTab from './tabs/TimeZoneTab/TimeZoneTab';
import CompletionCodes from './tabs/CompletionCodes/CompletionCodes';
// import QueuePhoneTab from './tabs/QueuePhoneTab/QueuePhoneTab';

const settingsTabs = [
  {
    id: 0,
    title: 'Основные',
    item: <MainTab />,
  },
  {
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
    title: 'Коды завершения',
    item: <CompletionCodes />,
  },
/*  {
    id: 3,
    title: 'Настройки Групп Очереди Операторов',
    item: <QueuePhoneTab />,
  },*/
];

export default settingsTabs;
