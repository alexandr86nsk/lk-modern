import SettingsPage from '../containers/SettingsPage/SettingsPage';
import ZonePage from '../containers/ZonePage/ZonePage';

const routes = [
  {
    path: '/zone',
    exact: true,
    component: ZonePage,
  },
  {
    path: '/settings',
    exact: true,
    component: SettingsPage,
  },
  {
    path: '/reports',
    exact: true,
    component: SettingsPage,
  },
];

export default routes;
