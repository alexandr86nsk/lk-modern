import axios from 'axios';
import qs from '../qs';
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

export const getHistoryExcell = (data) => axios.get(
  `${qs}Reports/CallTotalValuesReportFile?briefcaseId=${
    data.selectedHistoryBriefcase || ''
  }&startDate=${
    data.historyFrom ? JSON.stringify(data.historyFrom).replace(/"/g, '') : ''
  }&endDate=${
    data.historyTo ? JSON.stringify(data.historyTo).replace(/"/g, '') : ''
  }`,
);

export const getCallStatisticReport = (data) => {
  if (data === 0 || data) {
    return axios.get(`${qs}CallStatistic/Get?queue=${data}`);
  }
  return axios.get(`${qs}CallStatistic/GetList`);
};

export const getOperatorInfoReport = () => axios.get(`${qs}MemberQueue/GetOperatorInfo`);
