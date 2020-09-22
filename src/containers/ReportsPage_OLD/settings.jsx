import React from 'react';
import RatingReportBySettlementsTab from './tabs/RatingReportBySettlementsTab/RatingReportBySettlementsTab';
import OperationalReportTab from './tabs/OperationalReportTab/OperationalReportTab';
import RewardReportTab from './tabs/RewardReportTab/RewardReportTab';
import ActivationReportTab from './tabs/ActivationReportTab/ActivationReportTab';

const reportsTabs = [
  {
    id: 0,
    title: 'Рейтинговый отчёт по населённым пунктам',
    item: <RatingReportBySettlementsTab />,
  },
  {
    id: 1,
    title: 'Операционный отчёт',
    item: <OperationalReportTab />,
  },
  {
    id: 2,
    title: 'Отчёт по вознаграждению',
    item: <RewardReportTab />,
  },
  {
    id: 2,
    title: 'Отчёт по активациям',
    item: <ActivationReportTab />,
  },
];

export default reportsTabs;
