import React from 'react';
import RatingReportBySettlementsTab from './tabs/RatingReportBySettlementsTab/RatingReportBySettlementsTab';

const reportsTabs = [
  {
    id: 0,
    title: 'Рейтинговый отчёт по населённым пунктам',
    item: <RatingReportBySettlementsTab />,
  },
  {
    id: 1,
    title: 'Операционный отчёт',
    item: <RatingReportBySettlementsTab />,
  },
  {
    id: 2,
    title: 'Отчёт по вознаграждению',
    item: <RatingReportBySettlementsTab />,
  },
  {
    id: 2,
    title: 'Отчёт по активациям',
    item: <RatingReportBySettlementsTab />,
  },
];

export default reportsTabs;
