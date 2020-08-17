/* ********************* reports ***************** */
import requestParser from '../requestParser';

export const reportsStoreGetRatingReportBySettlements = (data) => requestParser({
  method: 'get',
  url: 'report/buildRatingReport',
  params: {
    ...data,
  },
});

export const reportsStoreGetOperationalReport = (data) => requestParser({
  method: 'get',
  url: 'report/buildOperationReport',
  params: {
    ...data,
  },
});
