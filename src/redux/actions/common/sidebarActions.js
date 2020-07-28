/* ********************************* SideBarStore  ********************************************** */
const sidebarStoreSetValue = (name, value) => ({
  type: 'SIDE_BAR_STORE_SET_VALUE',
  name,
  value,
});

export default sidebarStoreSetValue;
