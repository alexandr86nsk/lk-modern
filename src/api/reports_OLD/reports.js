/* ********************* reports_OLD ***************** */
import requestParser_with_refresh_token from '../requestParser_with_refresh_token';

export const reportsStoreGetRatingReportBySettlements = (data) => requestParser_with_refresh_token({
  method: 'get',
  url: 'report/buildRatingReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});

export const reportsStoreGetOperationalReport = (data) => requestParser_with_refresh_token({
  method: 'get',
  url: 'report/buildOperationReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});

export const reportsStoreGetRewardReport = (data) => requestParser_with_refresh_token({
  method: 'get',
  url: 'report/buildRewardReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});

export const reportsStoreGetActivationReport = (data) => requestParser_with_refresh_token({
  method: 'get',
  url: 'report/buildActivationReport',
  params: {
    ...data,
  },
  requestConfig: {
    responseType: 'arraybuffer',
  },
});
