/**
 * en: app name
 * ja: アプリ名
 */
export const AppName = `BlendMonitoring`;

/**
 * en: Bool value for beta
 * ja: ベータ版であるかどうかのbool値
 */
const isBeta = true;

/**
 * 装飾情報(ベータ版であるかどうかなど）を加えたアプリ名
 */
export const AppNameHasAccent = isBeta ? `${AppName} β` : `${AppName}`;

/**
 * サイト情報
 */
export const AppSiteInfo = {
  url: 'https://blend.nasikusa.net',
  shortenURL: 'https://bit.ly/33ZGL2i',
  version: '0.2.0-alpha.5',
  updatedAt: '2020 / 10 / 1',
  createdAt: '2020 / 07 / 25',
  description: `
  ${AppName}は
  画像やテクスチャ、カラー、描画モードなどの
  複数の色の組み合わせを
  一度に確認できる
  カラー調整ツールです。
  `,
};

/**
 * en: Developer information
 * ja: 開発者情報
 */
export const DeveloperInfo = {
  name: `nasikusa`,
  subName: `youkan`,
  github: `nasikusa`,
  twitter: `nakanasinokusa`,
} as const;

/**
 * en: Maximum number of glsl drawing items you can add
 * ja: 最大の追加できるglsl描画アイテムの数
 */
export const maxCountOfGlItem = 14;

/**
 * en: Information setting object related to save data
 * ja: セーブデータに関した情報設定のオブジェクト
 */
export const appSaveDataInfo = {
  extension: 'blmn',
};
