import { createDriver } from '@redux-requests/axios';
import axios from 'axios';

import getAPIPath from './getAPIPath';

function getAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: getAPIPath(),
    withCredentials: false,
  });

  return axiosInstance;
}

function getApiAccessDriver() {
  const axiosInstance = getAxiosInstance();
  return createDriver(axiosInstance);
}

export default getApiAccessDriver;
