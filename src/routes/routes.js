import BriefCasesPage from '../containers/BriefcasesPage/BriefcasesPage';
import SettingsPage from '../containers/SettingsPage/SettingsPage';
import ReportsPage from '../containers/ReportsPage/ReportsPage';
import ReportsGridPage from '../containers/ReportsGridPage/ReportsGridPage';

const routes = [
  {
    path: '/briefcases',
    exact: true,
    component: BriefCasesPage,
  },
  {
    path: '/settings',
    exact: true,
    component: SettingsPage,
  },
  {
    path: '/reports',
    exact: true,
    component: ReportsPage,
  },
  {
    path: '/reports_grid',
    exact: true,
    component: ReportsGridPage,
  },
];

export default routes;
