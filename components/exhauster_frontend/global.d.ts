import { compose } from 'redux';

export {};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    APP_AUTHENTICATION_OPTIONS: {
      url: string;
      realm: string;
      clientId: string;
      matomoSiteId: number;
    };
    RABBIT_HOST: string;
    RABBIT_WS_URL: string;
    RABBIT_PORT: string;
    RABBIT_USER: string;
    RABBIT_PASS: string;
  }
}
