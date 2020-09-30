import { ShaderBlendAll } from '../../constants/shader/Blend';
import {
  ShaderContainImageSize,
  ShaderCoverImageSize,
} from '../../constants/shader/ImageSize';
import ShaderColorConvert from '../../constants/shader/ColorConvert';

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
