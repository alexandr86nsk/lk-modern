/* ********************* reports ***************** */
import requestParser from '../requestParser';

export const reportsStoreGetRatingReportBySettlements = (data) => requestParser({
  method: 'get',
  url: 'report/buildRatingReport',
  params: {
    ...data,
  },
});

export const reportsStoreGetRatingReportBySettlements2 = (data) => requestParser({
  method: 'put',
  url: 'setting/bulk',
  data,
});
