import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../../stores/collectionData';

/**
 * シェーダーの変数定義文を生成する関数
 */
export default (multiCollectionData: GlCollectionInterfaceArray): string => {
  /**
   * シェーダー文字列配列
   */
  const resultShaderArray: string[] = multiCollectionData.map(
    (
      singleLayerData: GlCollectionInterface,
      collectionCurrentIndex: number
    ) => {
      const { type } = singleLayerData;

      /**
       * シェーダー文字列
       */
      let shader: string = '';
      switch (type) {
        case 'singleImage':
        case 'singleImageMultiBlends':
        case 'multiImages':
          shader = `uniform sampler2D layer${collectionCurrentIndex};`;
          break;
        case 'singleColor':
        case 'singleColorMultiBlends':
        case 'multiColors':
          shader = `uniform vec4 layer${collectionCurrentIndex};`;
          break;
        default:
          break;
      }
      return shader;
    }
  );

  /**
   * 最終的に吐き出されるシェーダー文字列
   */
  const resultShader = resultShaderArray.join('\n');

  return resultShader;
};
