import CreateShaderBlend from './CreateShaderBlend';

export default ( multiLayerData: any, baseLayerName: string ) => {
    const resultShaderArray: string[] = multiLayerData.map( ( singleLayerData : any ) => {
        const { layerNumber, blendMode, opacity } = singleLayerData;
        let shader : string = `
        ${baseLayerName} = ${CreateShaderBlend( blendMode, opacity, baseLayerName, `layer${layerNumber}ColorVec3`  )}
        `;
        
        return shader;
    });

    const resultShader = resultShaderArray.join('\n');

    return resultShader;
};