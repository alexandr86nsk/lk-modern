import React from 'react';
import { Navigate } from 'react-router-dom';

const Loadable = (Component) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Component />
  </React.Suspense>
);

const BriefCasesPage = Loadable(React.lazy(() => import('../pages/BriefcasesPage/BriefcasesPage')));
const SettingsPage = Loadable(React.lazy(() => import('../pages/SettingsPage/SettingsPage')));
const ReportsPage = Loadable(React.lazy(() => import('../pages/ReportsPage/ReportsPage')));
const ReportsGridPage = Loadable(React.lazy(() => import('../pages/ReportsGridPage/ReportsGridPage')));

console.log('BriefCasesPage: ', BriefCasesPage);

const routes = [
  {
    path: '/',
    caseSensitive: true,
    element: <Navigate to="briefcases" />,
  },
  {
    path: '/briefcases',
    caseSensitive: true,
    element: BriefCasesPage,
  },
  {
    path: '/settings',
    caseSensitive: true,
    element: SettingsPage,
  },
  {
    path: '/reports',
    caseSensitive: true,
    element: ReportsPage,
  },
  {
    path: '/reports_grid',
    caseSensitive: true,
    element: ReportsGridPage,
  },
];

export default routes;
