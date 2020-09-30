import { validate as uuidValidate } from 'uuid';
import { ValuesType } from 'utility-types';

import errorMessageText from '../../constants/develop/errorMessageText';
// collectionValue
import { collectionValueOpacityDictionaryType } from '../../stores/collection/collectionValueOpacity';
import { collectionValueColorDictionaryType } from '../../stores/collection/collectionValueColor';
import { collectionValueImageDictionaryType } from '../../stores/collection/collectionValueImage';
import { collectionValueVisibilityDictionaryType } from '../../stores/collection/collectionValueVisibility';
import { collectionValueBlendModeDictionaryType } from '../../stores/collection/collectionValueBlendMode';

// collectionData
import { IdType } from '../../types/collection/collectionData';

/**
 * ID情報から非正規化された透明度のオブジェクトを取得する
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
 * ID情報から非正規化されたカラーのオブジェクトを取得する
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
 * ID情報から非正規化された画像のオブジェクトを取得する
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
 * ID情報から非正規化されたVisibilityのオブジェクトを取得する
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
 * ID情報から非正規化された描画モードのオブジェクトを取得する
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
 * ID情報から非正規化された値のオブジェクトを取得する
 */
export const getDenormalizedValue = <T extends { [key: string]: any }>(
  argumentCollectionValueId: IdType,
  argumentDataObject: T
): ValuesType<T> => {
  if (!uuidValidate(argumentCollectionValueId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  return argumentDataObject[argumentCollectionValueId];
};
