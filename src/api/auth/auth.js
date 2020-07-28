import axios from 'axios';
import qs from '../qs';

export const getSmsCode = (data) => axios.post(`${qs}auth`, data);

export const logIn = (data) => axios.post(`${qs}auth/smscode`, data);
