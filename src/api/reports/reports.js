import requestParser from '../requestParser';

export const getActualStateReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/CallReport',
  params: data,
});

export const getHistoryReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/CallTotalValuesReport',
  params: data,
});

export const getHistoryExcell = (data) => requestParser({
  method: 'get',
  url: 'Reports/CallTotalValuesReportFile',
  params: data,
});

export const getCallStatisticReport = (data) => requestParser({
  method: 'get',
  url: `CallStatistic/Get${data.queue ? '' : 'List'}`,
  params: data,
});

export const getOperatorInfoReport = (data) => requestParser({
  method: 'get',
  url: 'MemberQueue/GetOperatorInfo',
  params: data,
});
