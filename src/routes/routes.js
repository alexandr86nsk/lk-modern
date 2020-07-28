import BriefCasePage from '../containers/BriefcasePage/BriefcaseListPage';
import BriefCasePageItem from '../containers/BriefcasePage/BriefcaseItemPage';
import SettingsPage from '../containers/SettingsPage/SettingsPage';
import ReportsPage from '../containers/ReportsPage/ReportsPage';
import AuthPage from '../containers/AuthPage/AuthPage';
import TestPage from '../containers/TestPage/TestPage';

const routes = [
  {
    path: '/briefcase',
    exact: true,
    component: BriefCasePage,
  },
  {
    path: '/briefcase/:index/',
    exact: true,
    component: BriefCasePageItem,
  },
  {
    path: '/settings',
    exact: true,
    component: SettingsPage,
  },
  {
    path: '/auth',
    exact: true,
    component: AuthPage,
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
