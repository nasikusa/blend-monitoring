import chroma from 'chroma-js';
import getFloatAdjustedString4GLSL from './getFloatAdjustedString4GLSL';

import {
  GlCollectionType,
  GlCollectionTypeArray,
} from '../../stores/collection/collectionData';
import { GlSettingsType } from '../../stores/general/glSettings';
import { StoredMediaStateType } from '../../stores/image/storedMedia';

/**
 * main関数内で使用する変数を定義する
 * @param multiCollectionData
 * @param glUVName 全体で共通のuv変数の名前
 * @param glSettings glsl描画の共通設定
 * @todo sizeがnullの際の挙動がないので修正したいです。
 *
 */
export default (
  multiCollectionData: GlCollectionTypeArray,
  glUVName: string,
  glSettings: GlSettingsType,
  glItemOrderKey: number,
  storedMediaState: StoredMediaStateType
) => {
  /**
   * シェーダー文字列配列
   */
  const resultShaderArray: string[] = multiCollectionData.map(
    (
      singleCollectionData: GlCollectionType,
      collectionCurrentIndex: number
    ) => {
      /**
       * シェーダー文字列の変数
       */
      let shader: string = '';
      switch (singleCollectionData.type) {
        case `singleImage`:
        case `singleImageMultiBlends`:
        case `multiImages`: {
          const { image } = singleCollectionData;
          if (image != null) {
            const imageWidth = Array.isArray(image)
              ? storedMediaState[image[glItemOrderKey]].rawWidth
              : storedMediaState[image].rawWidth;
            const imageHeight = Array.isArray(image)
              ? storedMediaState[image[glItemOrderKey]].rawHeight
              : storedMediaState[image].rawHeight;

            if (imageWidth != null && imageHeight != null) {
              shader = `
// background-size: coverのような感じでUV座標を取得し、vec2型の変数に入れる
vec2 layer${collectionCurrentIndex}ColorUV = ShaderCoverImageSize(
${glUVName},
vec2( ${glSettings.singleItemWidth.toFixed(1)},
${(glSettings.singleItemWidth * glSettings.singleItemAspect).toFixed(1)} ) ,
vec2( ${imageWidth.toFixed(1)} , ${imageHeight.toFixed(1)} ) );

vec4 layer${collectionCurrentIndex}ColorVec4 =
texture2D( layer${collectionCurrentIndex} , layer${collectionCurrentIndex}ColorUV );

vec3 layer${collectionCurrentIndex}ColorVec3 =
layer${collectionCurrentIndex}ColorVec4.rgb;
`;
            }
          }
          break;
        }
        case `singleColor`: {
          const glColor = chroma(`${singleCollectionData.color}`).gl();
          const [glRedColor, glGreenColor, glBlueColor, glAlphaColor] = glColor;

          shader = `
                vec4 layer${collectionCurrentIndex}ColorVec4 = vec4( ${getFloatAdjustedString4GLSL(
            glRedColor
          )} , ${getFloatAdjustedString4GLSL(
            glGreenColor
          )} , ${getFloatAdjustedString4GLSL(
            glBlueColor
          )} , ${getFloatAdjustedString4GLSL(glAlphaColor)} );
                vec3 layer${collectionCurrentIndex}ColorVec3 = layer${collectionCurrentIndex}ColorVec4.rgb;
                `;
          break;
        }
        case `singleColorMultiBlends`: {
          const glColor = chroma(
            `${singleCollectionData.color[glItemOrderKey]}`
          ).gl();
          const [glRedColor, glGreenColor, glBlueColor, glAlphaColor] = glColor;

          shader = `
                vec4 layer${collectionCurrentIndex}ColorVec4 = vec4( ${getFloatAdjustedString4GLSL(
            glRedColor
          )} , ${getFloatAdjustedString4GLSL(
            glGreenColor
          )} , ${getFloatAdjustedString4GLSL(
            glBlueColor
          )} , ${getFloatAdjustedString4GLSL(glAlphaColor)} );
                vec3 layer${collectionCurrentIndex}ColorVec3 = layer${collectionCurrentIndex}ColorVec4.rgb;
                `;
          break;
        }
        case `multiColors`: {
          if (Array.isArray(singleCollectionData.color)) {
            const glColor = chroma(
              `${singleCollectionData.color[glItemOrderKey]}`
            ).gl();
            const [
              glRedColor,
              glGreenColor,
              glBlueColor,
              glAlphaColor,
            ] = glColor;

            shader = `
                  vec4 layer${collectionCurrentIndex}ColorVec4 = vec4( ${getFloatAdjustedString4GLSL(
              glRedColor
            )} , ${getFloatAdjustedString4GLSL(
              glGreenColor
            )} , ${getFloatAdjustedString4GLSL(
              glBlueColor
            )} , ${getFloatAdjustedString4GLSL(glAlphaColor)} );
                  vec3 layer${collectionCurrentIndex}ColorVec3 = layer${collectionCurrentIndex}ColorVec4.rgb;
                  `;
          }
          break;
        }
        default:
          break;
      }
      return shader;
    }
  );

  const resultShader = resultShaderArray.join('\n');

  return resultShader;
};
