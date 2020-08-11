import axios from 'axios';

const dadataGetAddress = (data) => axios.post(
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
  data,
  {
    headers: {
      Authorization: 'Token c952a2eecc6e6cef458cee3a936f6820b00373d4',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
);

export default dadataGetAddress;
