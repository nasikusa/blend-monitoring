import FirstStringUpperCase from '../../../../utils/FisrtStringUpperCase';

import { GlCollectionInterface } from '../../../../stores/collectionData';

/**
 * 描画モードに関連したシェーダー
 * @param glItemOrderKey glsl描画アイテムの順番
 * @param baseLayerName 最終的に表示されるカラーベクトルの変数の名前
 * @param blendLayerName ブレンドするための変数の名前
 */
export default (
  blendMode: GlCollectionInterface['blendMode'],
  opacity: GlCollectionInterface['opacity'],
  baseLayerName: string,
  blendLayerName: string,
  glItemOrderKey: number
) => {
  let resultOpacity = '';
  let resultBlendMode = '';

  // もっと汎用化したい
  if (Array.isArray(opacity)) {
    if (opacity[glItemOrderKey] === 1) {
      resultOpacity = '1.0';
    } else if (opacity[glItemOrderKey] === 0) {
      resultOpacity = '0.0';
    }
  } else if (typeof opacity === 'number') {
    if (opacity === 1) {
      resultOpacity = '1.0';
    } else if (opacity === 0) {
      resultOpacity = '0.0';
    }
  }

  if (Array.isArray(blendMode)) {
    resultBlendMode = blendMode[glItemOrderKey];
  } else if (typeof blendMode === 'string') {
    resultBlendMode = blendMode;
  }

  /**
   * 最終的に吐き出されるシェーダーの文字列
   */
  const resultShader: string = `blend${FirstStringUpperCase(
    resultBlendMode
  )}( ${baseLayerName} , ${blendLayerName} , ${resultOpacity} );`;

  return resultShader;
};
