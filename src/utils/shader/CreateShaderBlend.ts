import firstStringUpperCase from '../general/getFisrtString2UpperCase';

import { GlCollectionType } from '../../stores/collectionData';

/**
 * 描画モードに関連したシェーダー
 * @param glItemOrderKey glsl描画アイテムの順番
 * @param baseLayerName 最終的に表示されるカラーベクトルの変数の名前
 * @param blendLayerName ブレンドするための変数の名前
 */
export default (
  // blendMode: GlCollectionType['blendMode'],
  blendMode: Pick<GlCollectionType, 'blendMode'>['blendMode'],
  opacity: Pick<GlCollectionType, 'opacity'>['opacity'],
  baseLayerName: string,
  blendLayerName: string,
  glItemOrderKey: number,
  collectionCurrentIndex: number
) => {
  let resultBlendMode = '';
  if (Array.isArray(blendMode)) {
    resultBlendMode = blendMode[glItemOrderKey];
  } else if (typeof blendMode === 'string') {
    resultBlendMode = blendMode;
  }

  /**
   * 最終的に吐き出されるシェーダーの文字列
   */
  const resultShader: string = `blend${firstStringUpperCase(
    resultBlendMode
  )}( ${baseLayerName} , ${blendLayerName} , layer${collectionCurrentIndex}Opacity );`;

  return resultShader;
};
