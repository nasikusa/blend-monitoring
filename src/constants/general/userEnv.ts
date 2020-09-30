import Bowser from 'bowser';

export const { userAgent } = window.navigator;
export const userEnvBrowser = Bowser.parse(userAgent);

/**
 * サポート対象プラットフォームであるかどうかのbool値
 */
export const isSatisfiedPlatform =
  userEnvBrowser.platform.type === 'tablet' ||
  userEnvBrowser.platform.type === 'desktop';

/**
 * サポート対象ブラウザーであるかどうかのbool値
 */
export const isSatisfiedBrowser =
  userEnvBrowser.browser.name !== 'Internet Explorer' &&
  (userEnvBrowser.browser.name !== 'Microsoft Edge' ||
    Number(userEnvBrowser.browser.version?.slice(0, 2)) > 25);

export const isSatisfied = isSatisfiedPlatform && isSatisfiedBrowser;

export const initWindowWidth = window.innerWidth;

export default userEnvBrowser;
