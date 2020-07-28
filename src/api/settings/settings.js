import axios from 'axios';
import qs from '../qs';

export const getMainSettings = () => axios.get(`${qs}Settings/Get`);

export const getRecallSettings = () => axios.get(`${qs}RetryRules/Get`);

export const getTimeZoneSettings = () => axios.get(`${qs}TimeZoneOptions/Get`);

export const getQueuePhoneSettings = () => axios.get(`${qs}QueueAsteriskOptions/GetList`);

export const getQueuePhoneControlTypes = () => axios.get(`${qs}QueueControlTypes/Get`);

export const updateMainSettings = (item) => axios.post(`${qs}Settings/Update`, item);

export const updateRecallSettings = (item) => axios.post(`${qs}RetryRules/Update`, item);

export const updateTimeZoneSettings = (item) => axios.post(`${qs}TimeZoneOptions/Update`, item);

export const updateQueuePhoneSettings = (item) => axios.post(`${qs}QueueAsteriskOptions/Update`, [item]);
