import React from 'react';
import SettingsTab from './tabs/SettingsTab/SettingsTab';

const settingsTabs = [
  {
    id: 0,
    title: 'Настройки',
    item: <SettingsTab />,
  },
  {
    id: 1,
    title: 'Список пользователей',
    item: <SettingsTab />,
  },
  {
    id: 2,
    title: 'Шаблоны СМС',
    item: <SettingsTab />,
  },
];

export default settingsTabs;
