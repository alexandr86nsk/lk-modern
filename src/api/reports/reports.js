import requestParserWithoutToken from '../requestParserWithoutToken';

export const getActualStateReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/CallReport',
  params: data,
});

export const getHistoryReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/CallTotalValuesReport',
  params: data,
});

export const getHistoryExcell = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/CallTotalValuesReportFile',
  params: data,
});

export const getCallStatisticReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: `CallStatistic/Get${data.queue ? '' : 'List'}`,
  params: data,
});

export const getOperatorInfoReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'MemberQueue/GetOperatorInfo',
  params: data,
});
