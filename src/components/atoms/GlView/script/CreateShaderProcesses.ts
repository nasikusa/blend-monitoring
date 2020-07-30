import CreateShaderBlend from './CreateShaderBlend';

import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../../stores/collectionData';

/**
 * ベースとなるカラーに色を追加する処理プロセス - main関数内で実行される
 * @param multiCollectionData 複数のコレクションがまとまったデータ配列
 * @param baseLayerName       最終出力されるベースとなるレイヤーの名前
 * @param itemKey             コレクション全体の中での順番（表示的には下から、配列としては上から）
 * @todo 透過度対応
 */
export default (
  multiCollectionData: GlCollectionInterfaceArray,
  baseLayerName: string,
  itemKey: number
) => {
  /**
   * シェーダー文字列の配列
   */
  const resultShaderArray: string[] = multiCollectionData.map(
    (
      singleCollectionData: GlCollectionInterface,
      collectionCurrentIndex: number
    ) => {
      const { blendMode, opacity } = singleCollectionData;
      const shader: string = `
        ${baseLayerName} = ${CreateShaderBlend(
        blendMode,
        opacity,
        baseLayerName,
        `layer${collectionCurrentIndex}ColorVec3`,
        itemKey
      )}
        `;

      return shader;
    }
  );

  const resultShader: string = resultShaderArray.join('\n');

  return resultShader;
};
