import requestParserWithoutToken from '../requestParserWithoutToken';

export const getJobDetailReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/JobDetailReport',
  params: data,
});

export const getJobStatusReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/JobStatusReport',
  params: data,
});

export const getJobHistoryReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/JobHistoryReport',
  params: data,
});

export const getJobCallHandlingReport = (data) => requestParserWithoutToken({
  method: 'get',
  url: 'Reports/JobCallHandlingReport',
  params: data,
});
