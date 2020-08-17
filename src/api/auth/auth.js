/* ********************* auth ***************** */
import requestParser from '../requestParser';

const logIn = (data) => {
  const {
    login,
    password,
  } = data || {};
  return requestParser({
    method: 'post',
    url: 'login',
    data: {
      Phone: login,
      Password: password,
    },
  });
};

export default logIn;
