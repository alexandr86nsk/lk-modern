/* ********************* calendar ***************** */
import requestParser_with_refresh_token from '../requestParser_with_refresh_token';

export const calendarStoreGetHolidays = () => requestParser_with_refresh_token({
  method: 'get',
  url: 'holidays/GetList',
});

export const calendarStoreSetHoliday = (data) => requestParser_with_refresh_token({
  method: 'post',
  url: 'holidays/insert',
  data,
});

export const calendarStoreRemoveHoliday = (id) => requestParser_with_refresh_token({
  method: 'delete',
  url: 'holidays/delete',
  params: {
    id,
  },
});
