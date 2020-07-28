export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email) {
    return re.test(email.toLowerCase());
  }
  return false;
};

export const validateUrl = (url) => {
  const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
  if (url) {
    return re.test(url.toLowerCase());
  }
  return false;
};

/* export const currencyFormatter = (currency) => {
  if (currency) {
    return `${currency.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`;
  }
  return currency;
}; */
