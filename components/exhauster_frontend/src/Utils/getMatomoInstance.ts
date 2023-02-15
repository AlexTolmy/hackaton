import { createInstance } from '@jonkoops/matomo-tracker-react';

import getAPIPath from '../Store/utils/getAPIPath';

function getMatomoInstance(userName: string) {
  if (!window.APP_AUTHENTICATION_OPTIONS.matomoSiteId) {
    return null;
  }

  return createInstance({
    urlBase: getAPIPath(),
    siteId: window.APP_AUTHENTICATION_OPTIONS.matomoSiteId,
    userId: userName,
    trackerUrl: 'https://ga.evraz.com/matomo.php',
    srcUrl: 'https://ga.evraz.com/matomo.js',
    disabled: false,
    heartBeat: {
      active: true,
      seconds: 10,
    },
    linkTracking: false,
    configurations: {
      disableCookies: true,
      setSecureCookie: true,
      setRequestMethod: 'POST',
    },
  });
}

export default getMatomoInstance;
