/* ******************************* calendarStore  ********************************************** */
export const calendarStoreSetSection = (value) => ({
  type: 'CALENDAR_STORE_SET_SECTION',
  value,
});

export const calendarStoreSetSubSection = (name, value) => ({
  type: 'CALENDAR_STORE_SET_SUB_SECTION',
  name,
  value,
});

export const calendarStoreClear = () => ({
  type: 'CALENDAR_STORE_CLEAR',
});

export const calendarStoreGetHolidays = (value) => ({
  type: 'CALENDAR_STORE_GET_HOLIDAYS',
  value,
});

export const calendarStoreGetHolidaysCancel = () => ({
  type: 'CALENDAR_STORE_GET_HOLIDAYS_CANCEL',
});

export const calendarStoreChangeDay = (value) => ({
  type: 'CALENDAR_STORE_CHANGE_DAY',
  value,
});

export const calendarStoreChangeDayCancel = () => ({
  type: 'CALENDAR_STORE_CHANGE_DAY_CANCEL',
});
