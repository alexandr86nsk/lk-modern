import { setToken } from '../../redux/actions/token/tokenActions';

export const winAuth = (appLoading) => {
  appLoading(true);
  setTimeout(() => appLoading(false), 1000);
};

export const logIn = (login, password, setPageLoading) => {
  setPageLoading(true);
  setTimeout(() => setPageLoading(false), 1000);
  setToken('');
};
