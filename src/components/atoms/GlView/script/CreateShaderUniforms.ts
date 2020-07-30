import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../../stores/collectionData';

type returnObjectType = { [key: string]: any };

/**
 * シェーダーのuniforms用のオブジェクトを生成する関数
 */
export default (
  multiCollectionData: GlCollectionInterfaceArray
): returnObjectType => {
  /**
   * 最終的に返されるオブジェクト
   */
  const resultUniformsObject: returnObjectType = {};
  multiCollectionData.forEach(
    (
      singleCollectionData: GlCollectionInterface,
      collectionCurrentIndex: number
    ) => {
      const { type, image } = singleCollectionData;
      switch (type) {
        case `singleImage`:
        case `singleImageMultiBlends`:
        case `multiImages`:
          resultUniformsObject[`layer${collectionCurrentIndex}`] = image;
          break;
        case `singleColor`:
          break;
        default:
          break;
      }
    }
  );
  return resultUniformsObject;
};
