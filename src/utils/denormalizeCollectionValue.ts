import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../constants/errorMessageText';
// collectionValue
import { collectionItemValueOpacityDictionaryType } from '../stores/collectionValueOpacity';
import { collectionItemValueColorDictionaryType } from '../stores/collectionValueColor';
import { collectionItemValueImageDictionaryType } from '../stores/collectionValueImage';
import { collectionItemValueVisibilityDictionaryType } from '../stores/collectionValueVisibility';
import { collectionItemValueBlendModeDictionaryType } from '../stores/collectionValueBlendMode';
// collectionData
import { IdType } from '../stores/collectionData';

// collectionValue系ストア用の非正規化関数
/**
 * ID情報から非正規化された透明度の値を取得する
 */
export const getDenormalizedOpacityValue = (
  argumentCollectionValueId: IdType,
  argumentDataObject: collectionItemValueOpacityDictionaryType
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
  argumentDataObject: collectionItemValueColorDictionaryType
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
  argumentDataObject: collectionItemValueImageDictionaryType
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
  argumentDataObject: collectionItemValueVisibilityDictionaryType
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
  argumentDataObject: collectionItemValueBlendModeDictionaryType
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
