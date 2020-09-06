import {
  GlCollectionTypeArray,
  GlCollectionType,
} from '../../types/collection/collectionData';
import getFloatAdjustedString4GLSL from './getFloatAdjustedString4GLSL';
import { StoredMediaStateType } from '../../stores/image/storedMedia';

type returnObjectType = { [key: string]: string };

/**
 * シェーダーのuniforms用のオブジェクトを生成する関数
 * @todo: カラーのuniform
 * @todo 画像サイズを可変にしたい
 * @see: gl-reactのuniformsのdocs https://gl-react-cookbook.surge.sh/api#uniforms
 */
export default (
  multiCollectionData: GlCollectionTypeArray,
  glItemOrderKey: number,
  storedMediaState: StoredMediaStateType
): returnObjectType => {
  /**
   * 最終的に返されるオブジェクト
   */
  const resultUniformsObject: returnObjectType = {};
  multiCollectionData.forEach(
    (
      singleCollectionData: GlCollectionType,
      collectionCurrentIndex: number
    ) => {
      const { opacity, visibility } = singleCollectionData;

      let resultOpacityValue: string = '0.0';
      if (!visibility) {
        // opacity = 0 で非表示と同義になる。もしくは他の方法でもいいのかも。
        resultOpacityValue = '0.0';
      } else if (Array.isArray(opacity)) {
        resultOpacityValue = getFloatAdjustedString4GLSL(
          opacity[collectionCurrentIndex]
        );
      } else if (typeof opacity === 'number') {
        resultOpacityValue = getFloatAdjustedString4GLSL(opacity);
      }

      switch (singleCollectionData.type) {
        case `singleImage`:
        case `singleImageMultiBlends`: {
          const { image } = singleCollectionData;
          if (image != null && typeof image === 'string') {
            resultUniformsObject[`layer${collectionCurrentIndex}`] =
              storedMediaState[image].resource.medium;
          }
          break;
        }
        case `multiImages`: {
          const { image } = singleCollectionData;
          if (image != null) {
            resultUniformsObject[`layer${collectionCurrentIndex}`] =
              storedMediaState[image[glItemOrderKey]].resource.medium;
          }
          break;
        }
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
