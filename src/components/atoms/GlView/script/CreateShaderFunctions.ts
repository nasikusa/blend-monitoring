import { ShaderBlendAll } from '../shaders/Blend';
import { ShaderContainImageSize, ShaderCoverImageSize } from '../shaders/ImageSize';

export default ( multiLayerData: any ) => {
    return `
    ${ShaderBlendAll}
    ${ShaderContainImageSize}
    ${ShaderCoverImageSize}
    `;
};