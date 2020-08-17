/* ********************* reports ***************** */
import requestParser from '../requestParser';

export const reportsStoreGetRatingReportBySettlements = (data) => requestParser({
  method: 'get',
  url: 'report/buildRatingReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});

export const reportsStoreGetOperationalReport = (data) => requestParser({
  method: 'get',
  url: 'report/buildOperationReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});
