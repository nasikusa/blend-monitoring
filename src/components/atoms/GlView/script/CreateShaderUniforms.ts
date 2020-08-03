import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../../stores/collectionData';
import ZeroOneFloatAdjust from '../../../../utils/ZeroOneFloatAdjust';

type returnObjectType = { [key: string]: any };

/**
 * シェーダーのuniforms用のオブジェクトを生成する関数
 * @todo: カラーのuniform
 * @see: gl-reactのuniformsのdocs https://gl-react-cookbook.surge.sh/api#uniforms
 */
export default (
  multiCollectionData: GlCollectionInterfaceArray,
  glItemOrderKey: number
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
      const { type, image, opacity, visibility } = singleCollectionData;

      let resultOpacityValue: string = '0.0';
      if (!visibility) {
        // opacity = 0 で非表示と同義になる。もしくは他の方法でもいいのかも。
        resultOpacityValue = '0.0';
      } else if (Array.isArray(opacity)) {
        resultOpacityValue = ZeroOneFloatAdjust(
          opacity[collectionCurrentIndex]
        );
      } else if (typeof opacity === 'number') {
        resultOpacityValue = ZeroOneFloatAdjust(opacity);
      }

      switch (type) {
        case `singleImage`:
        case `singleImageMultiBlends`:
          resultUniformsObject[`layer${collectionCurrentIndex}`] = image;
          break;
        case `multiImages`:
          if (image != null) {
            resultUniformsObject[`layer${collectionCurrentIndex}`] =
              image[glItemOrderKey];
          }
          break;
        case `singleColor`:
        case `singleColorMultiBlends`:
          break;
        case `multiColors`:
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
