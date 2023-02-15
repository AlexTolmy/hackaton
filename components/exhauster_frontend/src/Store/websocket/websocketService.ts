/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { Client } from '@stomp/stompjs';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import mockNewViolationsCount from '../../Mock/mockNewViolationsCount';

interface WebsocketServiceInterface {
  Connect: (store: MiddlewareAPI<Dispatch<AnyAction>, any>) => void;
  Disconnect: () => void;
}

class WebsocketService implements WebsocketServiceInterface {
  private static _instance: WebsocketService;

  private _client: Client;

  private _store: MiddlewareAPI<Dispatch<AnyAction>, any>;

  constructor() {
    this._client = new Client({
      brokerURL: `ws://${window.RABBIT_WS_URL}`,
      connectHeaders: {
        login: window.RABBIT_USER,
        passcode: window.RABBIT_PASS,
      },
    });
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public Connect(store: MiddlewareAPI<Dispatch<AnyAction>, any>) {
    this._store = store;
    this._client.onConnect = () => {
      this.subscribeNewViolationsCount();
    };
    this._client.activate();

    // Should be deleted for prod
    mockNewViolationsCount(this._client);
  }

  public Disconnect() {
    this._client.deactivate();
  }

  private subscribeNewViolationsCount() {
    this._client.subscribe('/exchange/UI', (msg) => {
      console.log(msg);
      /*       this._store.dispatch(setNewViolationsCount(count));
       */
    });
  }
}

const websocketServiceInstance = WebsocketService.instance;

export default websocketServiceInstance;
