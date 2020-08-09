import chroma from 'chroma-js';
import ZeroOneFloatAdjust from '../../../../utils/ZeroOneFloatAdjust';

import {
  GlCollectionInterface,
  GlCollectionInterfaceArray,
} from '../../../../stores/collectionData';
import { GlSettingsType } from '../../../../stores/glSettings';
import { StoredMediaStateType } from '../../../../stores/storedMedia';

/**
 * main関数内で使用する変数を定義する
 * @param multiCollectionData
 * @param glUVName 全体で共通のuv変数の名前
 * @param glSettings glsl描画の共通設定
 * @todo sizeがnullの際の挙動がないので修正したいです。
 *
 */
export default (
  multiCollectionData: GlCollectionInterfaceArray,
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
      singleCollectionData: GlCollectionInterface,
      collectionCurrentIndex: number
    ) => {
      const { type, size, image } = singleCollectionData;

      /**
       * シェーダー文字列の変数
       */
      let shader: string = '';
      switch (type) {
        case `singleImage`:
        case `singleImageMultiBlends`:
        case `multiImages`: {
          if (image != null) {
            const imageWidth = Array.isArray(image)
              ? storedMediaState[image[glItemOrderKey]].rawWidth
              : storedMediaState[image].rawWidth;
            const imageHeight = Array.isArray(image)
              ? storedMediaState[image[glItemOrderKey]].rawHeight
              : storedMediaState[image].rawHeight;

            switch (size) {
              case `normal`:
                shader = `
vec4 layer${collectionCurrentIndex}ColorVec4 =
texture2D( layer${collectionCurrentIndex} , ${glUVName} );
vec3 layer${collectionCurrentIndex}ColorVec3 =
layer${collectionCurrentIndex}ColorVec4.rgb;
`;
                break;
              case `cover`:
                if (imageWidth != null && imageHeight != null) {
                  shader = `
  // background-size: coverのような感じでUV座標を取得し、vec2型の変数に入れる
  vec2 layer${collectionCurrentIndex}ColorUV = ShaderCoverImageSize(
  ${glUVName},
  vec2( ${glSettings.singleItemWidth.toFixed(1)},
  ${glSettings.singleItemHeight.toFixed(1)} ) ,
  vec2( ${imageWidth.toFixed(1)} , ${imageHeight.toFixed(1)} ) );

  vec4 layer${collectionCurrentIndex}ColorVec4 =
  texture2D( layer${collectionCurrentIndex} , layer${collectionCurrentIndex}ColorUV );

  vec3 layer${collectionCurrentIndex}ColorVec3 =
  layer${collectionCurrentIndex}ColorVec4.rgb;
  `;
                }
                break;
              case `contain`:
                // not working
                if (imageWidth != null && imageHeight != null) {
                  shader = `
  vec2 layer${collectionCurrentIndex}ColorUV =
  ShaderContainImageSize(
  ${glUVName},
  vec2( ${glSettings.singleItemWidth.toFixed(1)},
  ${glSettings.singleItemHeight.toFixed(1)} ) ,
  vec2( ${imageWidth.toFixed(1)} ,
  ${imageHeight.toFixed(1)} ) );

  vec4 layer${collectionCurrentIndex}ColorVec4 =
  texture2D( layer${collectionCurrentIndex} , layer${collectionCurrentIndex}ColorUV );

  vec3 layer${collectionCurrentIndex}ColorVec3 =
   layer${collectionCurrentIndex}ColorVec4.rgb;
  `;
                }
                break;
              default:
                break;
            }
          }
          break;
        }
        case `singleColor`:
        case `singleColorMultiBlends`: {
          const glColor = chroma(`${singleCollectionData.color}`).gl();
          const [glRedColor, glGreenColor, glBlueColor, glAlphaColor] = glColor;

          shader = `
                vec4 layer${collectionCurrentIndex}ColorVec4 = vec4( ${ZeroOneFloatAdjust(
            glRedColor
          )} , ${ZeroOneFloatAdjust(glGreenColor)} , ${ZeroOneFloatAdjust(
            glBlueColor
          )} , ${ZeroOneFloatAdjust(glAlphaColor)} );
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
                  vec4 layer${collectionCurrentIndex}ColorVec4 = vec4( ${ZeroOneFloatAdjust(
              glRedColor
            )} , ${ZeroOneFloatAdjust(glGreenColor)} , ${ZeroOneFloatAdjust(
              glBlueColor
            )} , ${ZeroOneFloatAdjust(glAlphaColor)} );
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
