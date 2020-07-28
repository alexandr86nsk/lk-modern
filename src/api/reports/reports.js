import axios from 'axios';
import qs from '../qs';

export const getActualStateReport = (data) => axios.get(
  `${qs}Reports/CallReport?startDate=${
    data.actualStateFrom ? JSON.stringify(data.actualStateFrom).replace(/"/g, '') : ''
  }&endDate=${
    data.actualStateTo ? JSON.stringify(data.actualStateTo).replace(/"/g, '') : ''
  }&briefcaseId=${
    data.selectedActualStateBriefcase || ''
  }&phone=${
    data.selectedActualStatePhone || ''}`,
);

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

export const getOperatorInfoReport = () => axios.get(`${qs}MemberQueue/GetOperatorInfo`);
