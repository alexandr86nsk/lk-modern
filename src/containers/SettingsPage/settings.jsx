import React from 'react';
import SettingsTab from './tabs/SettingsTab/SettingsTab';
import UsersTab from './tabs/UsersTab/UsersTab';
import TemplatesTab from './tabs/TemplatesTab/TemplatesTab';

const settingsTabs = [
  {
    id: 0,
    title: 'Настройки',
    item: <SettingsTab />,
  },
  {
    id: 1,
    title: 'Список пользователей',
    item: <UsersTab />,
  },
  {
    id: 2,
    title: 'Шаблоны СМС',
    item: <TemplatesTab />,
  },
];

export default settingsTabs;
