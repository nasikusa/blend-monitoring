import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../../constants/develop/errorMessageText';
// collectionValue
import { collectionValueOpacityDictionaryType } from '../../stores/collection/collectionValueOpacity';
import { collectionValueColorDictionaryType } from '../../stores/collection/collectionValueColor';
import { collectionValueImageDictionaryType } from '../../stores/collection/collectionValueImage';
import { collectionValueVisibilityDictionaryType } from '../../stores/collection/collectionValueVisibility';
import { collectionValueBlendModeDictionaryType } from '../../stores/collection/collectionValueBlendMode';
// collectionData
import { IdType } from '../../types/collection/collectionData';

// collectionValue系ストア用の非正規化関数
/**
 * ID情報から非正規化された透明度の値を取得する
 */
export const getDenormalizedOpacityValue = (
  argumentCollectionValueId: IdType,
  argumentDataObject: collectionValueOpacityDictionaryType
) => {
  if (!uuidValidate(argumentCollectionValueId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  return argumentDataObject[argumentCollectionValueId];
};
/**
 * ID情報から非正規化されたカラーの値を取得する
 */
export const getDenormalizedColorValue = (
  argumentCollectionValueId: IdType,
  argumentDataObject: collectionValueColorDictionaryType
) => {
  if (!uuidValidate(argumentCollectionValueId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  return argumentDataObject[argumentCollectionValueId];
};
/**
 * ID情報から非正規化された画像の値を取得する
 */
export const getDenormalizedImageValue = (
  argumentCollectionValueId: IdType,
  argumentDataObject: collectionValueImageDictionaryType
) => {
  if (!uuidValidate(argumentCollectionValueId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  return argumentDataObject[argumentCollectionValueId];
};
/**
 * ID情報から非正規化されたVisibilityの値を取得する
 */
export const getDenormalizedVisibilityValue = (
  argumentCollectionValueId: IdType,
  argumentDataObject: collectionValueVisibilityDictionaryType
) => {
  if (!uuidValidate(argumentCollectionValueId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  return argumentDataObject[argumentCollectionValueId];
};
/**
 * ID情報から非正規化された描画モードの値を取得する
 */
export const getDenormalizedBlendModeValue = (
  argumentCollectionValueId: IdType,
  argumentDataObject: collectionValueBlendModeDictionaryType
) => {
  if (!uuidValidate(argumentCollectionValueId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  return argumentDataObject[argumentCollectionValueId];
};
/**
 * 非正規化されたCollectionValue系のオブジェクトで出来たオブジェクトを取得する
 */
// export const getDenormalizedCollectionValueObject = (
//   dataObjectObject: DenormalizedCollectionValuesObjectType
// ) => {
//   return {
//     image: dataObjectObject.collectionValueImage,
//     color: dataObjectObject.collectionValueColor,
//     visibility: dataObjectObject.collectionValueVisibility,
//     blendMode: dataObjectObject.collectionValueBlendMode,
//     opacity: dataObjectObject.collectionValueOpacity,
//   };
// };
