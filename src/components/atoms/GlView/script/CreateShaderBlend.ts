export default ( blendMode: string, opacity: any, baseLayerName: string, blendLayerName: string ) => {
    if( opacity === 1 ){
        opacity = `1.0`;
    }else if( opacity === 0 ){
        opacity = `0.0`;
    }
    
    const resultShader = `blend${blendMode.charAt(0).toUpperCase() + blendMode.slice(1)}( ${baseLayerName} , ${blendLayerName} , ${opacity} );`;
    return resultShader;
}