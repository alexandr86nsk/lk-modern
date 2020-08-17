import SettingsPage from '../containers/SettingsPage/SettingsPage';
import ZonePage from '../containers/ZonePage/ZonePage';
import ReportsPage from '../containers/ReportsPage/ReportsPage';
import CalendarPage from '../containers/CalendarPage/CalendarPage';

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
    component: ReportsPage,
  },
  {
    path: '/calendar',
    exact: true,
    component: CalendarPage,
  },
];

export default routes;
