import SettingsPage from '../containers/SettingsPage/SettingsPage';

const routes = [
  {
    path: '/zone',
    exact: true,
    component: SettingsPage,
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
