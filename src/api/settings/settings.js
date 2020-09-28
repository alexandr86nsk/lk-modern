import axios from 'axios';
import qs from '../qs';
import requestParser from '../requestParser';

export const getMainSettings = () => requestParser({
  method: 'get',
  url: 'Settings/Get',
});

export const updateMainSettings = (data) => requestParser({
  method: 'post',
  url: 'Settings/Update',
  data,
});

export const getRecallSettings = () => requestParser({
  method: 'get',
  url: 'RetryRules/Get',
});

export const updateRecallSettings = (data) => requestParser({
  method: 'post',
  url: 'RetryRules/Update',
  data,
});

export const getTimeZoneSettings = () => requestParser({
  method: 'get',
  url: 'TimeZoneOptions/Get',
});

export const updateTimeZoneSettings = (data) => requestParser({
  method: 'post',
  url: 'TimeZoneOptions/Update',
  data,
});

/* export const getQueuePhoneSettings = () => axios.get(`${qs}QueueAsteriskOptions/GetList`);

export const getQueuePhoneControlTypes = () => axios.get(`${qs}QueueControlTypes/Get`);

export const updateQueuePhoneSettings = (item) => axios.post(`${qs}QueueAsteriskOptions/Update`, [item]); */
