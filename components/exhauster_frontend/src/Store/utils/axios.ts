import { createDriver } from '@redux-requests/axios';
import axios from 'axios';
import { KeycloakInstance } from 'keycloak-js';

import getAPIPath from './getAPIPath';

const AUTH_HEADER_NAME = 'Authorization';
const TOKEN_VALIDITY_SEC = 10;

function getAxiosInstance(keycloakInstance?: KeycloakInstance) {
  const axiosInstance = axios.create({
    baseURL: getAPIPath(),
    withCredentials:
      process.env.NODE_ENV !== 'development' && !!keycloakInstance,
  });

  if (keycloakInstance) {
    axiosInstance.interceptors.request.use((config) => {
      keycloakInstance.updateToken(TOKEN_VALIDITY_SEC);

      return {
        ...config,
        headers: {
          ...config.headers,
          common: {
            [AUTH_HEADER_NAME]: `Bearer ${keycloakInstance.token}`,
          },
        },
      };
    });
  }

  return axiosInstance;
}

function getApiAccessDriver(keycloakInstance?: KeycloakInstance) {
  const axiosInstance = getAxiosInstance(keycloakInstance);
  return createDriver(axiosInstance);
}

export default getApiAccessDriver;
