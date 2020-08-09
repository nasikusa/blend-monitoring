/*eslint-disable*/
import BlendModeData, {
  BlendModesType,
  PartialBlendModeDataType,
  BlendModeDataItemType,
  BlendModeDataType,
} from '../constants/blendModeData';

// @todo
// 配列 <=> オブジェクト
// ソート用
// 配列 | 文字列 処理

/**
 * すでに準備が整っている描画モードを取得する
 */
const getReadyBlendMode = (
  blendModeData: BlendModeDataType
): PartialBlendModeDataType => {
  const resultObject: PartialBlendModeDataType = {};
  (Object.keys(blendModeData) as (keyof BlendModeDataType)[]).forEach(
    (objectKey) => {
      if (blendModeData[objectKey].ready !== false) {
        resultObject[objectKey] = blendModeData[objectKey];
      }
    }
  );
  return resultObject;
};

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
export const getBoolStateBlendObject = (
  blendModeData: any,
  invertBlendModeArray: string[] = [],
  defaultBooleanValue: boolean = false
) => {
  let resultObject: any = {};
  const insertObject: any = {};

  Object.keys(blendModeData).forEach((objectKey) => {
    if (blendModeData[objectKey].ready !== false) {
      resultObject[objectKey] = defaultBooleanValue;
    }
  });
  invertBlendModeArray.forEach((blendModeName: string) => {
    insertObject[blendModeName] = !defaultBooleanValue;
  });

  resultObject = {
    ...resultObject,
    ...insertObject,
  };
  return resultObject;
};

/**
 * 一つだけのtrueの値をもつオブジェクトかどうかを判別する
 * @param boolStateBlendObject
 */
export const isSingleTrueStateObject = (boolStateBlendObject: any) => {
  let boolTrueCount: number = 0;
  for (const k of Object.keys(boolStateBlendObject)) {
    if (boolStateBlendObject[k] === true) {
      boolTrueCount += 1;
      if (boolTrueCount >= 2) {
        return false;
      }
    }
  }
  return true;
};

export const getTrueStateBlendNameArray = (boolStateBlendObject: any) => {
  const boolTrueNameArray: string[] = [];
  for (const k of Object.keys(boolStateBlendObject)) {
    if (boolStateBlendObject[k] === true) {
      boolTrueNameArray.push(k);
    }
  }
  return boolTrueNameArray;
};

/**
 *
 * @param blendModeData
 * @param onlyReady
 */
export const getBlendModeArray = (
  blendModeData: BlendModeDataType,
  onlyReady: boolean = true
): BlendModeDataItemType[] => {
  const resultArray = [];
  for (const key of Object.keys(blendModeData) as (keyof BlendModeDataType)[]) {
    resultArray.push(blendModeData[key]);
  }
  if (onlyReady) {
    return resultArray.filter((singleBlendModeData) => {
      return (
        singleBlendModeData.ready === true || singleBlendModeData.ready == null
      );
    });
  }
  return resultArray;
};

export const readyBlendModeArray: BlendModeDataItemType[] = getBlendModeArray(
  BlendModeData,
  true
);
export const blendModeArray: BlendModeDataItemType[] = getBlendModeArray(
  BlendModeData,
  false
);
