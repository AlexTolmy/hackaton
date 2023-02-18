function getAPIPath() {
  const apiHost = process.env.REACT_APP_API_HOST;
  const apiPath = process.env.REACT_APP_API_PATH;
  const originHost = window.location.origin;

  return `${apiHost || originHost}${apiPath}`;
}

export default getAPIPath;
