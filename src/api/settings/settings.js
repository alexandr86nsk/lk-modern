/* ********************* settings ***************** */
import requestParser from '../requestParser';

export const settingsStoreGetSettings = () => requestParser({
  method: 'get',
  url: 'setting',
});

export const settingsStoreSaveSettings = (data) => requestParser({
  method: 'put',
  url: 'setting/bulk',
  data,
});

export const settingsStoreGetUsers = (data) => requestParser({
  method: 'post',
  url: 'user/GetPagination',
  data,
});

export const settingsStoreGetUserRoles = () => requestParser({
  method: 'get',
  url: 'role',
});

export const settingsStoreGetUserInfo = (id) => requestParser({
  method: 'get',
  url: `user/${id}`,
});

export const settingsStoreSaveUser = (data) => requestParser({
  method: 'put',
  url: 'user',
  data,
});

export const settingsStoreAddUser = (data) => requestParser({
  method: 'post',
  url: 'user',
  data,
});

export const settingsStoreRemoveUser = (id) => requestParser({
  method: 'delete',
  url: `user/${id}`,
});

export const settingsStoreGetTemplates = () => requestParser({
  method: 'get',
  url: 'messageTemplate',
});

export const settingsStoreGetTemplateInfo = (id) => requestParser({
  method: 'get',
  url: `messageTemplate/${id}`,
});

export const settingsStoreGetTemplateVar = () => requestParser({
  method: 'get',
  url: 'varTemplate',
});

export const settingsStoreSaveTemplate = (data) => requestParser({
  method: 'put',
  url: 'messageTemplate',
  data,
});

export const settingsStoreAddTemplate = (data) => requestParser({
  method: 'post',
  url: 'messageTemplate',
  data,
});

export const settingsStoreRemoveTemplate = (id) => requestParser({
  method: 'delete',
  url: `messageTemplate/${id}`,
});
