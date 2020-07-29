export default ( multiLayerData : any ) => {
    const resultShaderArray: string[] = multiLayerData.map( ( singleLayerData : any ) => {
        const { type, layerNumber } = singleLayerData;
        let shader : string = "";
        switch( type ){
            case `image`:
                shader = `uniform sampler2D layer${layerNumber};`;
            break;
            case `singleColor`:
                shader = `uniform vec4 layer${layerNumber};`;
            break;
        }
        return shader;
    });

    const resultShader = resultShaderArray.join('\n');

    return resultShader;
};