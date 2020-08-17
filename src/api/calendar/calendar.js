/* ********************* calendar ***************** */
import requestParser from '../requestParser';

export const calendarStoreGetHolidays = () => requestParser({
  method: 'get',
  url: 'holidays/GetList',
});

export const calendarStoreSetHoliday = (data) => requestParser({
  method: 'post',
  url: 'holidays/insert',
  data,
});

export const calendarStoreRemoveHoliday = (id) => requestParser({
  method: 'delete',
  url: 'holidays/delete',
  params: {
    id,
  },
});
