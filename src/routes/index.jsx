import React from 'react';
import BriefCasesPage from '../pages/BriefcasesPage/BriefcasesPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ReportsPage from '../pages/ReportsPage/ReportsPage';
import ReportsGridPage from '../pages/ReportsGridPage/ReportsGridPage';

const routes = [
  {
    path: '/briefcases',
    element: <BriefCasesPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/reports',
    element: <ReportsPage />,
  },
  {
    path: '/reports_grid',
    element: <ReportsGridPage />,
  },
];

export default routes;
