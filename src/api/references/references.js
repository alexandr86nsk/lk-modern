import axios from 'axios';
import qs from '../qs';

export const getBriefcaseStatuses = () => axios.get(`${qs}References/GetBriefcaseStatuses`);

export const getBriefcaseItemResults = () => axios.get(`${qs}References/GetBriefcaseItemResuls`);

export const getBriefcaseItemStatuses = () => axios.get(`${qs}References/GetBriefcaseItemStatuses`);

export const getCallResults = () => axios.get(`${qs}References/GetCallResults`);

export const getCallsStatuses = () => axios.get(`${qs}References/GetCallsStatuses`);

export const getEventTypes = () => axios.get(`${qs}References/GetEventTypes`);
