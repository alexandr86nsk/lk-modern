import requestParser from '../requestParser';

export const getJobDetailReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/JobDetailReport',
  params: data,
});

export const getJobStatusReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/JobStatusReport',
  params: data,
});

export const getJobHistoryReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/JobHistoryReport',
  params: data,
});

export const getJobCallHandlingReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/JobCallHandlingReport',
  params: data,
});
