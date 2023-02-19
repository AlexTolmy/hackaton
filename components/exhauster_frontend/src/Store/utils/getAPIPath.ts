function getAPIPath() {
  const apiHost = 'http://159.65.113.87/';
  const apiPath = 'api/';
  const originHost = window.location.origin;

  return `${apiHost || originHost}${apiPath}`;
}

export default getAPIPath;
