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
