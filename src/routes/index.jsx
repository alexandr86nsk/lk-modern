import React from 'react';
import BriefCasesPage from '../containers/BriefcasesPage/BriefcasesPage';
import SettingsPage from '../containers/SettingsPage/SettingsPage';
import ReportsPage from '../containers/ReportsPage/ReportsPage';
import ReportsGridPage from '../containers/ReportsGridPage/ReportsGridPage';

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
