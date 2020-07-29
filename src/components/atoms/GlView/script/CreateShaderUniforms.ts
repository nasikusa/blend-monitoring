export default ( multiLayerData : any ): string[] => {
    const resultUniformsObject: any = {};
    multiLayerData.forEach(( singleLayerData : any ) => {
        const { type, layerNumber, image } = singleLayerData;
        switch( type ){
            case `image`:
                resultUniformsObject[`layer${layerNumber}`] = image.source;
            break;
            case `singleColor`:
                
            break;
            default:

            break;
        }
    });
    return resultUniformsObject;
};