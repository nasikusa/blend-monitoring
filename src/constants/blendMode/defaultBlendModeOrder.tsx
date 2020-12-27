/**
 * @file 描画モードのデフォルトの順番を定義した定数のファイル
 * @todo ストアでも描画モードのデフォルトの順番を定義していたと記憶しているので、どちらかをメインに使用するかや、どのような関係になっているかをコメントに明記したい
 */
const defaultBlendModeOrder = [
  'darken',
  'multiply',
  'linearBurn',
  'colorBurn',
  'darkerColor',
  'pinLight',
  'overlay',
  'linearLight',
  'vividLight',
  'softLight',
  'hardLight',
  'hardMix',
  'lighten',
  'screen',
  'linearDodge',
  'colorDodge',
  'lighterColor',
  'difference',
  'exclusion',
  'subtract',
  'divide',
  'hue',
  'color',
  'saturation',
  'luminosity',
] as const;

export default defaultBlendModeOrder;
