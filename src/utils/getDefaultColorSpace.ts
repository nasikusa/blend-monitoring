import userEnvBrowser from '../constants/general/userEnv';

const getDefaultColorSpace = () => {
  const userEnv = userEnvBrowser;
  switch (userEnv.browser.name) {
    case 'FireFox':
      return 'linear';
    case 'Chrome':
    case 'Opera':
    case 'Microsoft Edge':
      return 'sRGB';
    default:
      return 'unknown';
  }
};

export default getDefaultColorSpace;
