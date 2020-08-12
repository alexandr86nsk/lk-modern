/* ******************************* settingsStore  ********************************************** */
export const settingsStoreSetSection = (value) => ({
  type: 'SETTINGS_STORE_SET_SECTION',
  value,
});

export const settingsStoreSetSubSection = (name, value) => ({
  type: 'SETTINGS_STORE_SET_SUB_SECTION',
  name,
  value,
});

export const settingsStoreClear = () => ({
  type: 'SETTINGS_STORE_CLEAR',
});

/* ************************** settings **************************** */
export const settingsStoreGetSettings = () => ({
  type: 'SETTINGS_STORE_GET_SETTINGS',
});

export const settingsStoreGetSettingsCancel = () => ({
  type: 'SETTINGS_STORE_GET_SETTINGS_CANCEL',
});

export const settingsStoreUpdateSettings = (value) => ({
  type: 'SETTINGS_STORE_UPDATE_SETTINGS',
  value,
});

export const settingsStoreSaveSettings = (value) => ({
  type: 'SETTINGS_STORE_SAVE_SETTINGS',
  value,
});

export const settingsStoreSaveSettingsCancel = () => ({
  type: 'SETTINGS_STORE_SAVE_SETTINGS_CANCEL',
});

/* ************************** users **************************** */
export const settingsStoreGetUsers = (value) => ({
  type: 'SETTINGS_STORE_GET_USERS',
  value,
});

export const settingsStoreGetUsersCancel = () => ({
  type: 'SETTINGS_STORE_GET_USERS_CANCEL',
});

export const settingsStoreGetUserRoles = () => ({
  type: 'SETTINGS_STORE_GET_USER_ROLES',
});

export const settingsStoreGetUserRolesCancel = () => ({
  type: 'SETTINGS_STORE_GET_USER_ROLES_CANCEL',
});

export const settingsStoreSetUsersTableStoreSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USERS_TABLE_STORE_SECTION',
  value,
});

export const settingsStoreSetUsersTableTemplateSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USERS_TABLE_TEMPLATE_SECTION',
  value,
});

export const settingsStoreGetUserInfo = (value) => ({
  type: 'SETTINGS_STORE_GET_USER_INFO',
  value,
});

export const settingsStoreGetUserInfoCancel = () => ({
  type: 'SETTINGS_STORE_GET_USER_INFO_CANCEL',
});

export const settingsStoreSetUserInfoSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USER_INFO_SECTION',
  value,
});

export const settingsStoreSaveUser = (value) => ({
  type: 'SETTINGS_STORE_SAVE_USER',
  value,
});

export const settingsStoreSaveUserCancel = () => ({
  type: 'SETTINGS_STORE_SAVE_USER_CANCEL',
});

export const settingsStoreRemoveUser = (value) => ({
  type: 'SETTINGS_STORE_REMOVE_USER',
  value,
});

export const settingsStoreRemoveUserCancel = () => ({
  type: 'SETTINGS_STORE_REMOVE_USER_CANCEL',
});

export const settingsStoreClearUserInfo = () => ({
  type: 'SETTINGS_STORE_CLEAR_USER_INFO',
});

export const settingsStoreSetUserInfoAddressRegistrationSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USER_INFO_ADDRESS_REGISTRATION_SECTION',
  value,
});

export const settingsStoreSetUserInfoAddressResidenceSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USER_INFO_ADDRESS_RESIDENCE_SECTION',
  value,
});

/* ************************** templates **************************** */
export const settingsStoreGetTemplates = () => ({
  type: 'SETTINGS_STORE_GET_TEMPLATES',
});

export const settingsStoreGetTemplatesCancel = () => ({
  type: 'SETTINGS_STORE_GET_TEMPLATES_CANCEL',
});

export const settingsStoreSetTemplatesTableStoreSection = (value) => ({
  type: 'SETTINGS_STORE_SET_TEMPLATES_TABLE_STORE_SECTION',
  value,
});

export const settingsStoreSetTemplatesTableTemplateSection = (value) => ({
  type: 'SETTINGS_STORE_SET_TEMPLATES_TABLE_TEMPLATE_SECTION',
  value,
});

export const settingsStoreGetTemplateInfo = (value) => ({
  type: 'SETTINGS_STORE_GET_TEMPLATE_INFO',
  value,
});

export const settingsStoreGetTemplateInfoCancel = () => ({
  type: 'SETTINGS_STORE_GET_TEMPLATE_INFO_CANCEL',
});

export const settingsStoreSetTemplateInfoSection = (value) => ({
  type: 'SETTINGS_STORE_SET_TEMPLATE_INFO_SECTION',
  value,
});

export const settingsStoreSaveTemplate = (value) => ({
  type: 'SETTINGS_STORE_SAVE_TEMPLATE',
  value,
});

export const settingsStoreSaveTemplateCancel = () => ({
  type: 'SETTINGS_STORE_SAVE_TEMPLATE_CANCEL',
});

export const settingsStoreRemoveTemplate = (value) => ({
  type: 'SETTINGS_STORE_REMOVE_TEMPLATE',
  value,
});

export const settingsStoreRemoveTemplateCancel = () => ({
  type: 'SETTINGS_STORE_REMOVE_TEMPLATE_CANCEL',
});

export const settingsStoreClearTemplateInfo = () => ({
  type: 'SETTINGS_STORE_CLEAR_TEMPLATE_INFO',
});

export const settingsStoreGetTemplateVar = () => ({
  type: 'SETTINGS_STORE_GET_TEMPLATE_VAR',
});

export const settingsStoreGetTemplateVarCancel = () => ({
  type: 'SETTINGS_STORE_GET_TEMPLATE_VAR_CANCEL',
});

/* ************************** dadata **************************** */
export const settingsStoreDadataGetAddress = (value) => ({
  type: 'SETTINGS_STORE_DADATA_GET_ADDRESS',
  value,
});

export const settingsStoreDadataGetAddressCancel = () => ({
  type: 'SETTINGS_STORE_DADATA_GET_ADDRESS_CANCEL',
});
