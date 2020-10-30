import React from 'react';
import { Navigate } from 'react-router-dom';
import BriefCasesPage from '../pages/BriefcasesPage/BriefcasesPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ReportsPage from '../pages/ReportsPage/ReportsPage';
import ReportsGridPage from '../pages/ReportsGridPage/ReportsGridPage';
import InputTestPage from '../pages/InputTestPage';

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
  {
    path: '/inputs',
    caseSensitive: true,
    element: <InputTestPage />,
  },
];

export default routes;
