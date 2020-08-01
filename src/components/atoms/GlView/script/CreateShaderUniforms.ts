import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../../stores/collectionData';
import ZeroOneFloatAdjust from '../../../../utils/ZeroOneFloatAdjust';

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
      const { type, image, opacity } = singleCollectionData;

      let resultOpacityValue: string = '0.0';
      if (Array.isArray(opacity)) {
        resultOpacityValue = ZeroOneFloatAdjust(
          opacity[collectionCurrentIndex]
        );
      } else if (typeof opacity === 'number') {
        resultOpacityValue = ZeroOneFloatAdjust(opacity);
      }

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

      resultUniformsObject[
        `layer${collectionCurrentIndex}Opacity`
      ] = resultOpacityValue;
    }
  );
  return resultUniformsObject;
};
