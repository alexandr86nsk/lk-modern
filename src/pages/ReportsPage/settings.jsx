import React from 'react';
import ActualStateTab from './tabs/ActualStateTab/ActualStateTab';
import HistoryTab from './tabs/HistoryTab/HistoryTab';
import IndicatorsTab from './tabs/IndicatorsTab/IndicatorsTab';

const reportsTabs = [
  {
    id: 0,
    title: 'Текущие состояния',
    item: <ActualStateTab />,
  },
  {
    id: 1,
    title: 'Мониторинг событий',
    item: <HistoryTab />,
  },
  {
    id: 2,
    title: 'Показатели',
    item: <IndicatorsTab />,
  },
];

export default reportsTabs;
