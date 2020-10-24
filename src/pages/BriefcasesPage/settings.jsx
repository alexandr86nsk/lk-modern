import React from 'react';
import MainTab from './settingsTabs/MainTab/MainTab';
import ArchiveTab from './settingsTabs/ArchiveTab/ArchiveTab';

export const briefcasesTableTemplate = [
  {
    id: 0,
    title: 'Название',
    dataKey: 'QueuePhone',
    width: 90,
    fixed: true,
    column: {
      sortable: true,
    },
  },
  {
    id: 1,
    title: 'Дата последнего изменения',
    dataKey: 'LastCheckQueueMembers',
    type: 'date',
    column: {
      sortable: true,
    },
  },
  {
    id: 2,
    title: 'Действия',
    type: 'icon-actions',
    width: 155,
  },
];

export const settingsTabs = [
  {
    id: 0,
    title: 'Настройки',
    item: <MainTab />,
  },
  {
    id: 1,
    title: 'Очередь операторов(Архив)',
    item: <ArchiveTab />,
  },
];
