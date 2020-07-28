/* ********************* auth ***************** */
import requestParser from '../requestParser';

const logIn = (data) => requestParser(
  'post',
  'login',
  {
    Phone: data.login,
    Password: data.password,
  },
);

export default logIn;
