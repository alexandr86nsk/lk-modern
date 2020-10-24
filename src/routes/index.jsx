import React from 'react';
import { Navigate } from 'react-router-dom';
import BriefCasesPage from '../pages/BriefcasesPage/BriefcasesPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ReportsPage from '../pages/ReportsPage/ReportsPage';
import ReportsGridPage from '../pages/ReportsGridPage/ReportsGridPage';

const routes = [
  {
    path: '/',
    caseSensitive: true,
    element: <Navigate to="briefcases" />,
  },
  {
    path: '/briefcases',
    caseSensitive: true,
    element: <BriefCasesPage />,
  },
  {
    path: '/settings',
    caseSensitive: true,
    element: <SettingsPage />,
  },
  {
    path: '/reports',
    caseSensitive: true,
    element: <ReportsPage />,
  },
  {
    path: '/reports_grid',
    caseSensitive: true,
    element: <ReportsGridPage />,
  },
];

export default routes;
