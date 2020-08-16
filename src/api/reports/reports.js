/* ********************* reports ***************** */
import requestParser from '../requestParser';

export const reportsStoreGetRatingReportBySettlements = (data) => requestParser(
  'post',
  'report',
  data,
);

export const reportsStoreGetRatingReportBySettlements2 = (data) => requestParser(
  'put',
  'setting/bulk',
  data,
);
