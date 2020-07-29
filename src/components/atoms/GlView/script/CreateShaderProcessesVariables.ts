import chroma from "chroma-js";
import ZeroOneFloatAdjust from '../../../../utils/ZeroOneFloatAdjust';

export default ( multiLayerData : any, glUVName: string, glSettings: any ) => {
    const resultShaderArray: string[] = multiLayerData.map( ( singleLayerData : any ) => {
        const { type, layerNumber, image } = singleLayerData;
        let shader : string = "";
        switch( type ){
            case `image`:
                switch( image.type ){
                    case `normal`:
                        shader = `
                        vec4 layer${layerNumber}ColorVec4 = texture2D( layer${layerNumber} , ${glUVName} );
                        vec3 layer${layerNumber}ColorVec3 = layer${layerNumber}ColorVec4.rgb;
                        `;
                    break;
                    case `cover`:
                        shader = `
                        vec2 layer${layerNumber}ColorUV = ShaderCoverImageSize( ${glUVName}, vec2( ${glSettings.singleItemWidth.toFixed(1)}, ${glSettings.singleItemHeight.toFixed(1)} ) , vec2( ${image.originalWidth.toFixed(1)} , ${image.originalHeight.toFixed(1)} ) );
                        vec4 layer${layerNumber}ColorVec4 = texture2D( layer${layerNumber} , layer${layerNumber}ColorUV );
                        vec3 layer${layerNumber}ColorVec3 = layer${layerNumber}ColorVec4.rgb;
                        `;
                    break;
                    case `contain`:
                        // not working
                        shader = `
                        vec2 layer${layerNumber}ColorUV = ShaderContainImageSize( ${glUVName}, vec2( ${glSettings.singleItemWidth.toFixed(1)}, ${glSettings.singleItemHeight.toFixed(1)} ) , vec2( ${image.originalWidth.toFixed(1)} , ${image.originalHeight.toFixed(1)} ) );
                        vec4 layer${layerNumber}ColorVec4 = texture2D( layer${layerNumber} , layer${layerNumber}ColorUV );
                        vec3 layer${layerNumber}ColorVec3 = layer${layerNumber}ColorVec4.rgb;
                        `;
                    break;
                }
            break;
            case `singleColor`:
                const glColor = chroma(`${singleLayerData.singleColor}`).gl();
                console.log(glColor);
                shader = `
                vec4 layer${layerNumber}ColorVec4 = vec4( ${ZeroOneFloatAdjust(glColor[0])} , ${ZeroOneFloatAdjust(glColor[1])} , ${ZeroOneFloatAdjust(glColor[2])} , ${ZeroOneFloatAdjust(glColor[3])} );
                vec3 layer${layerNumber}ColorVec3 = layer${layerNumber}ColorVec4.rgb;
                `;
            break;
        }
        return shader;
    });

    const resultShader = resultShaderArray.join('\n');

    return resultShader;
};