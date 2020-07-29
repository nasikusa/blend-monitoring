import { ShaderBlendAll } from '../shaders/Blend';
import { ShaderContainImageSize, ShaderCoverImageSize } from '../shaders/ImageSize';

/**
 * 関数シェーダーを吐き出す関数
 */
export default ( multiLayerData: any ) => {
    return `
    ${ShaderBlendAll}
    ${ShaderContainImageSize}
    ${ShaderCoverImageSize}
    `;
};