/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { Client } from '@stomp/stompjs';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { setLastUpdateDateAction } from '../reducers/exhaustersMonitorReducer';
import { fetchExhaustersAction } from '../requests/fetchExhausters';

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
      this.subscribe();
    };
    this._client.activate();
    // mockNewViolationsCount(this._client);
  }

  public Disconnect() {
    this._client.deactivate();
  }

  private subscribe() {
    type MessageBody = {
      update_at: string;
    };

    this._client.subscribe('/exchange/ui_exchange', (msg) => {
      const body: MessageBody = JSON.parse(msg.body);
      const backendUpdateDate = new Date(body.update_at);
      this._store.dispatch(setLastUpdateDateAction(backendUpdateDate));
      this._store.dispatch(fetchExhaustersAction());
    });
  }
}

const websocketServiceInstance = WebsocketService.instance;

export default websocketServiceInstance;
