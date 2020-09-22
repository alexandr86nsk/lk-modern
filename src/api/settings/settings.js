/* ********************* settings ***************** */
import requestParser_with_refresh_token from '../requestParser_with_refresh_token';

export const settingsStoreGetSettings = () => requestParser_with_refresh_token({
  method: 'get',
  url: 'setting',
});

export const settingsStoreSaveSettings = (data) => requestParser_with_refresh_token({
  method: 'put',
  url: 'setting/bulk',
  data,
});

export const settingsStoreGetUsers = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'user/GetPagination',
  data,
});

export const settingsStoreGetUserRoles = () => requestParser_with_refresh_token({
  method: 'get',
  url: 'role',
});

export const settingsStoreGetUserInfo = (id) => requestParser_with_refresh_token({
  method: 'get',
  url: `user/${id}`,
});

export const settingsStoreSaveUser = (data) => requestParser_with_refresh_token({
  method: 'put',
  url: 'user',
  data,
});

export const settingsStoreAddUser = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'user',
  data,
});

export const settingsStoreRemoveUser = (id) => requestParser_with_refresh_token({
  method: 'delete',
  url: `user/${id}`,
});

export const settingsStoreGetTemplates = () => requestParser_with_refresh_token({
  method: 'get',
  url: 'messageTemplate',
});

export const settingsStoreGetTemplateInfo = (id) => requestParser_with_refresh_token({
  method: 'get',
  url: `messageTemplate/${id}`,
});

export const settingsStoreGetTemplateVar = () => requestParser_with_refresh_token({
  method: 'get',
  url: 'varTemplate',
});

export const settingsStoreSaveTemplate = (data) => requestParser_with_refresh_token({
  method: 'put',
  url: 'messageTemplate',
  data,
});

export const settingsStoreAddTemplate = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'messageTemplate',
  data,
});

export const settingsStoreRemoveTemplate = (id) => requestParser_with_refresh_token({
  method: 'delete',
  url: `messageTemplate/${id}`,
});
