import axios from 'axios';
import qs from '../qs';
import requestParser from '../requestParser';

export const getQueueAsteriskList = () => requestParser({
  method: 'get',
  url: 'QueueAsteriskOptions/GetList',
});

export const getBriefCases = () => axios.get(`${qs}Briefcase/GetList`);

export const getBriefCase = (id) => axios.get(`${qs}Briefcase/Get/?itemId=${id}`);

export const addBriefCase = (data) => axios.post(`${qs}Briefcase/Add/?title=${data.title}&queuePhone=${data.queuePhone || ''}`);

export const updateBriefCase = (item) => axios.post(`${qs}Briefcase/Update`, item);

export const deleteBriefCase = (id) => axios.post(`${qs}Briefcase/Delete/?itemId=${id}`);

export const startBriefCase = (id) => axios.get(`${qs}Briefcase/Start/?itemId=${id}`);

export const stopBriefCase = (id) => axios.get(`${qs}Briefcase/StopExternal/?itemId=${id}`);

export const uploadBriefCaseFile = (id, files) => {
  const data = new FormData();
  data.append('itemId', id);
  for (let i = 0; i < files.length; i += 1) {
    data.append('FILES[]', files[i]);
  }
  return axios.post(`${qs}Briefcase/UploadFile`, data);
};

export const getBriefCaseItemCalls = (id) => axios.get(`${qs}BriefcaseItems/GetList/?briefcaseId=${id}`);

export const getBriefCaseItem = (id) => axios.get(`${qs}Briefcase/Get/?itemId=${id}`);

export const getQueueAsteriskControlTypes = () => axios.get(`${qs}QueueControlTypes/Get`);

export const addBriefCaseItem = (item) => axios.get(`${qs}BriefcaseItems/Add/?title=${item}`);

export const updateBriefCaseItem = (item) => axios.post(`${qs}BriefcaseItems/Update`, item);

export const deleteBriefCaseItem = (id) => axios.delete(`${qs}BriefcaseItems/Delete/${id}`);

// export const getQueueAsteriskList = () => axios.get(`${qs}QueueAsteriskOptions/GetList`);

export const getQueueAsteriskTimeZoneSettings = (id) => axios.get(`${qs}TimeZoneOptions/GetByPhone?queuePhone=${id}`);

export const getQueueAsteriskRetryRulesSettings = (id) => axios.get(`${qs}RetryRules/GetByPhone?queuePhone=${id}`);

export const getQueueAsteriskSettings = (id) => axios.get(`${qs}QueueAsteriskOptions/Get?queuePhone=${id}`);

export const saveQueueAsteriskRecallSettings = (data) => axios.post(`${qs}RetryRules/UpdateByPhone`, data);

export const saveQueueAsteriskTimeZoneSettings = (data) => axios.post(`${qs}TimeZoneOptions/Update`, data);

export const saveQueueAsteriskSettings = (data) => axios.post(`${qs}QueueAsteriskOptions/UpdateSingle`, data);
