import { Client } from '@stomp/stompjs';

function mockNewViolationsCount(client: Client) {
  setTimeout(() => {
    client.publish({
      destination: '/exchange/UI',
      body: '5',
    });
  }, 5000);

  setTimeout(() => {
    client.publish({
      destination: '/exchange/UI',
      body: '10',
    });
  }, 10000);

  setTimeout(() => {
    client.publish({
      destination: '/exchange/UI',
      body: '15',
    });
  }, 15000);
}

export default mockNewViolationsCount;
