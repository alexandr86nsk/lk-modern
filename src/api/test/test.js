import axios from 'axios';
import qs from '../qs';

export const getJobDetailReport = (data) => axios.get(`${qs}Reports/JobDetailReport?briefcaseId=${data.selectedBriefcase || ''}`);

export const getJobStatusReport = (data) => axios.get(`${qs}Reports/JobStatusReport?briefcaseId=${data.selectedBriefcase || ''}`);

export const getJobHistoryReport = (data) => axios.get(`${qs}Reports/JobHistoryReport?briefcaseId=${data.selectedBriefcase || ''}`);

export const getJobCallHandlingReport = (data) => axios.get(`${qs}Reports/JobCallHandlingReport?briefcaseId=${data.selectedBriefcase || ''}`);
/*
export const getHistoryReport = (data) => axios.get(
  `${qs}Reports/CallTotalValuesReport?briefcaseId=${
    data.selectedHistoryBriefcase || ''
  }&startDate=${
    data.historyFrom ? JSON.stringify(data.historyFrom).replace(/"/g, '') : ''
  }&endDate=${
    data.historyTo ? JSON.stringify(data.historyTo).replace(/"/g, '') : ''
  }`,
);

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
*/

export const getOperatorInfoReport2222 = () => axios.get(`${qs}MemberQueue/GetOperatorInfo`);
