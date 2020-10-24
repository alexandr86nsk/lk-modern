/* ********************* auth ***************** */
import requestParserWithoutToken from '../requestParserWithoutToken';

const logIn = (data) => {
  const {
    login,
    password,
  } = data || {};
  return requestParserWithoutToken({
    method: 'post',
    url: 'login',
    data: {
      Phone: login,
      Password: password,
    },
  });
};

export default logIn;
