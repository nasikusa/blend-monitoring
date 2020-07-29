import BlendModeData from '../constants/blendModeData';

/**
 * すでに準備が整っている描画モードを取得する
 */
export const getReadyBlendMode = ( blendModeData:any ) => {
    const resultObject:any = {};
    for(let k of Object.keys(blendModeData)) {
        if( blendModeData[k].ready !== false ){
            resultObject[k] = blendModeData[k];
        }
    }
    return resultObject;
}

/**
 * getReadyBlendMode関数の返り値。準備が出来ているもののobjectのみ取得。
 */
export const readyBlendModeData = getReadyBlendMode(BlendModeData);

/**
 * reduxなどで管理する描画モードのオンオフのオブジェクトを生成する
 * @param blendModeData 描画モードのデータオブジェクト
 * @param invertBlendModeArray デフォルトブール値を値が違う描画モードを配列にして文字を入れる
 * @param defaultBooleanValue デフォルトのbool値
 */
export const getBoolStateBlendObject = ( blendModeData:any, invertBlendModeArray: string[] = [], defaultBooleanValue: boolean = false ) => {
    let resultObject:any = {};
    const insertObject:any = {};
    for(let k of Object.keys(blendModeData)) {
        if( blendModeData[k].ready !== false ){
            resultObject[k] = defaultBooleanValue;
        }
    }

    invertBlendModeArray.forEach((blendModeName: string) => {
        insertObject[blendModeName] = !defaultBooleanValue;
    })

    resultObject = {
        ...resultObject,
        ...insertObject,
    }
    return resultObject;
};

/**
 * 一つだけのtrueの値をもつオブジェクトかどうかを判別する
 * @param boolStateBlendObject 
 */
export const isSingleTrueStateObject = (boolStateBlendObject:any) => {
    let boolTrueCount: number = 0;
    for(let k of Object.keys(boolStateBlendObject)) {
        if( boolStateBlendObject[k] === true ){
            boolTrueCount += 1;
            if( boolTrueCount >= 2 ){
                return false;
            }
        }
    }
    return true;
}

export const getTrueStateBlendNameArray = (boolStateBlendObject:any) => {
    const boolTrueNameArray: string[] = [];
    for(let k of Object.keys(boolStateBlendObject)) {
        if( boolStateBlendObject[k] === true ){
            boolTrueNameArray.push(k);
        }
    }
    return boolTrueNameArray;
}

/**
 * 
 * @param blendModeData 
 * @param onlyReady 
 */
export const getBlendModeArray = (blendModeData: any, onlyReady: boolean = true) => {
    const resultArray = [];
    for(let k of Object.keys(blendModeData)) {
        resultArray.push(blendModeData[k]);
    }
    if( onlyReady ){
        return resultArray.filter((singleBlendModeData) => {
            return singleBlendModeData.ready === true || singleBlendModeData.ready == null;
        });
    }
    return resultArray;
}

export const readyBlendModeArray = getBlendModeArray(BlendModeData,true);
export const blendModeArray = getBlendModeArray(BlendModeData,false);