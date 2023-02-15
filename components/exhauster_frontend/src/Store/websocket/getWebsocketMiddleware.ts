/* eslint-disable consistent-return */
import { Middleware } from 'redux';

import { WC_CONNECT, WS_DISCONNECT } from './websocketActions';
import websocketServiceInstance from './websocketService';

function getWebsocketMiddleware(): Middleware {
  return (store) => (next) => (action) => {
    switch (action.type) {
      case WC_CONNECT:
        websocketServiceInstance.Connect(store);
        break;
      case WS_DISCONNECT:
        websocketServiceInstance.Disconnect();
        break;
      default:
        return next(action);
    }
  };
}

export default getWebsocketMiddleware;
