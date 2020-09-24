/**
 * アプリ名
 */
export const AppName = `BlendMonitoring`;
const isBeta = true;
export const AppNameHasAccent = isBeta ? `${AppName} β` : `${AppName}`;

/**
 * サイト情報
 */
export const AppSiteInfo = {
  url: 'https://blend.nasikusa.net',
  shortenURL: 'https://bit.ly/33ZGL2i',
  version: '0.2.0-alpha.2',
  updatedAt: '2020 / 09 / 24',
  createdAt: '2020 / 07 / 25',
  description: `
  ${AppName}は
  画像やテクスチャ、カラー、描画モードなどの
  複数の色の組み合わせを
  一度に確認できる
  カラーグレーディングツールです。
  `,
};

/**
 * 開発者情報
 */
export const DeveloperInfo = {
  name: `nasikusa`,
  subName: `youkan`,
  github: `nasikusa`,
  twitter: `nakanasinokusa`,
} as const;

/**
 * 最大の追加できるglsl描画アイテムの数
 */
export const maxCountOfGlItem = 14;

export const appSaveDataInfo = {
  extension: 'blmn',
};
