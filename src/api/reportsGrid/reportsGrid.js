import axios from 'axios';
import qs from '../qs';
import requestParser from '../requestParser';

export const getJobDetailReport = (data) => axios.get(`${qs}Reports/JobDetailReport?briefcaseId=${data.selectedBriefcase || ''}`);

export const getJobStatusReport = (data) => requestParser({
  method: 'get',
  url: 'Reports/JobStatusReport',
  params: data,
})

export const getJobHistoryReport = (data) => axios.get(`${qs}Reports/JobHistoryReport?briefcaseId=${data.selectedBriefcase || ''}`);

export const getJobCallHandlingReport = (data) => axios.get(`${qs}Reports/JobCallHandlingReport?briefcaseId=${data.selectedBriefcase || ''}`);
