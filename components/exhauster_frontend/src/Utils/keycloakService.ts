/* eslint-disable no-underscore-dangle */
import { MatomoInstance } from '@jonkoops/matomo-tracker-react/lib/types';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { AnyAction, Store } from 'redux';

import getStoreInstance from '../Store';

import getMatomoInstance from './getMatomoInstance';
import getTranslation from './getTranslation';

const LOGIN_ATTEMPTS = 'LOGIN_ATTEMPTS';
const UPDATE_TOKEN_DELAY = 59000;

type InitReactType = (
  store: Store<any, AnyAction>,
  matomo?: MatomoInstance,
) => void;

class KeycloakService {
  private static _instance: KeycloakService;

  private _keycloakInstance: KeycloakInstance;

  private _isConfigExists = !!window.APP_AUTHENTICATION_OPTIONS;

  constructor() {
    if (this._isConfigExists) {
      this._keycloakInstance = Keycloak(window.APP_AUTHENTICATION_OPTIONS);
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public get keycloakInstance() {
    return this._keycloakInstance;
  }

  public startApp(initReact: InitReactType) {
    if (this._isConfigExists) {
      this.startWithAuth(initReact);
    } else {
      this.startWithoutAuth(initReact);
    }
  }

  private startWithoutAuth(initReact: InitReactType) {
    const store = getStoreInstance(this._keycloakInstance);
    initReact(store);
  }

  private async startWithAuth(initReact: InitReactType) {
    const isAuthSuccessful = await this._keycloakInstance.init({
      onLoad: 'login-required',
      flow: 'standard',
      pkceMethod: 'S256',
    });

    if (isAuthSuccessful) {
      localStorage.setItem(LOGIN_ATTEMPTS, '0');
      const store = getStoreInstance(this._keycloakInstance);
      this.updateToken();
      const userName = this._keycloakInstance.tokenParsed.preferred_username;
      const matomo = getMatomoInstance(userName);
      initReact(store, matomo);
    } else {
      this.startLogin();
    }
  }

  private startLogin() {
    let loginAttempts = Number(localStorage.getItem(LOGIN_ATTEMPTS));
    if (!loginAttempts) {
      loginAttempts = 0;
    }

    if (loginAttempts < 5) {
      loginAttempts += 1;
      localStorage.setItem(LOGIN_ATTEMPTS, loginAttempts.toString());
      this._keycloakInstance.login({ redirectUri: window.location.origin });
    } else {
      // eslint-disable-next-line no-alert
      alert(getTranslation('authError'));
      localStorage.setItem(LOGIN_ATTEMPTS, '0');
    }
  }

  private updateToken() {
    const keycloakInstance = this._keycloakInstance;

    setTimeout(function update() {
      keycloakInstance.updateToken(UPDATE_TOKEN_DELAY);
      setTimeout(update, UPDATE_TOKEN_DELAY);
    }, UPDATE_TOKEN_DELAY);
  }
}

const keycloakServiceInstance = KeycloakService.instance;

export default keycloakServiceInstance;
