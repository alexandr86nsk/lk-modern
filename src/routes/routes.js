import BriefCasesPage from '../containers/BriefcasesPage/BriefcasesPage';
import SettingsPage from '../containers/SettingsPage/SettingsPage';
import ReportsPage from '../containers/ReportsPage/ReportsPage';
import TestPage from '../containers/TestPage/TestPage';

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
    path: '/test',
    exact: true,
    component: TestPage,
  },
];

export default routes;
