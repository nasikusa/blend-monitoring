import { ShaderBlendAll } from '../shaders/Blend';
import {
  ShaderContainImageSize,
  ShaderCoverImageSize,
} from '../shaders/ImageSize';
import ShaderColorConvert from '../shaders/ColorConvert';

/**
 * 関数シェーダーを吐き出す関数
 * @todo 必要な関数のみ吐き出せるようにしたい
 */
export default (): string => {
  return `
    ${ShaderColorConvert}
    ${ShaderBlendAll}
    ${ShaderContainImageSize}
    ${ShaderCoverImageSize}
    `;
};
