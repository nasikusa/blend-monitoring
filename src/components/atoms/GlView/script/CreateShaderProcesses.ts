import CreateShaderBlend from './CreateShaderBlend';

import {
  GlCollectionTypeArray,
  GlCollectionType,
} from '../../../../stores/collectionData';

/**
 * ベースとなるカラーに色を追加する処理プロセス - main関数内で実行される
 * @param multiCollectionData 複数のコレクションがまとまったデータ配列
 * @param baseLayerName       最終出力されるベースとなるレイヤーの名前
 * @param glItemOrderKey      glsl描画アイテムそれぞれの順番
 * @todo 透過度対応
 */
export default (
  multiCollectionData: GlCollectionTypeArray,
  baseLayerName: string,
  glItemOrderKey: number
) => {
  /**
   * シェーダー文字列の配列
   */
  const resultShaderArray: string[] = multiCollectionData.map(
    (
      singleCollectionData: GlCollectionType,
      collectionCurrentIndex: number
    ) => {
      const { blendMode, opacity } = singleCollectionData;
      const shader: string = `
        ${baseLayerName} = ${CreateShaderBlend(
        blendMode,
        opacity,
        baseLayerName,
        `layer${collectionCurrentIndex}ColorVec3`,
        glItemOrderKey,
        collectionCurrentIndex
      )}
        `;

      return shader;
    }
  );

  const resultShader: string = resultShaderArray.join('\n');

  return resultShader;
};
