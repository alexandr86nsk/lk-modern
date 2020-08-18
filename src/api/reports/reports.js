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

export const reportsStoreGetRewardReport = (data) => requestParser({
  method: 'get',
  url: 'report/buildRewardReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});

export const reportsStoreGetActivationReport = (data) => requestParser({
  method: 'get',
  url: 'report/buildActivationReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});
