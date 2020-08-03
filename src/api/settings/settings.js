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

export const settingsStoreSaveUser = (data) => requestParser(
  'put',
  'user',
  data,
);

export const settingsStoreAddUser = (data) => requestParser(
  'post',
  'user',
  data,
);

export const settingsStoreRemoveUser = (id) => requestParser(
  'delete',
  `user/${id}`,
);

export const settingsStoreGetTemplates = () => requestParser(
  'get',
  'messageTemplate',
);

export const settingsStoreGetTemplateInfo = (id) => requestParser(
  'get',
  `messageTemplate/${id}`,
);

export const settingsStoreGetTemplateVar = () => requestParser(
  'get',
  'varTemplate',
);

export const settingsStoreSaveTemplate = (data) => requestParser(
  'put',
  'messageTemplate',
  data,
);

export const settingsStoreAddTemplate = (data) => requestParser(
  'post',
  'messageTemplate',
  data,
);

export const settingsStoreRemoveTemplate = (id) => requestParser(
  'delete',
  `messageTemplate/${id}`,
);
