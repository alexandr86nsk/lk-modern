/* ********************* settings ***************** */
import requestParser from '../requestParser';

export const settingsStoreGetSettings = () => requestParser(
  'get',
  'setting',
);

export const settingsStoreSaveSettings = (data) => requestParser(
  'put',
  'setting/bulk',
  data,
);

export const settingsStoreGetUsers = () => requestParser(
  'get',
  'user',
);

export const settingsStoreGetUserInfo = (id) => requestParser(
  'get',
  `user/${id}`,
);
