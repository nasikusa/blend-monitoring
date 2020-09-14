import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../../constants/develop/errorMessageText';
// collectionValue
import {
  collectionValueOpacityDictionaryType,
  collectionValueOpacityValueType,
} from '../../stores/collection/collectionValueOpacity';
import {
  collectionValueColorDictionaryType,
  collectionValueColorValueType,
} from '../../stores/collection/collectionValueColor';
import {
  collectionValueImageDictionaryType,
  collectionValueImageValueType,
} from '../../stores/collection/collectionValueImage';
import {
  collectionValueVisibilityDictionaryType,
  collectionValueVisibilityValueType,
} from '../../stores/collection/collectionValueVisibility';
import {
  collectionValueBlendModeDictionaryType,
  collectionValueBlendModeValueType,
} from '../../stores/collection/collectionValueBlendMode';
// collectionValue
import { getDenormalizedValue } from './denormalizeCollectionValue';
// collectionItem
import { collectionItemDictionaryType } from '../../stores/collection/collectionItem';
// collectionData
import { IdType } from '../../types/collection/collectionData';

/**
 * コレクションアイテム取得関数のベースとなる必須引数オブジェクトの型(引数)
 */
export type DenormalizeBaseCollectionItemArgType = {
  readonly collectionItem: collectionItemDictionaryType;
  readonly collectionValueOpacity: collectionValueOpacityDictionaryType;
  readonly collectionValueBlendMode: collectionValueBlendModeDictionaryType;
  readonly collectionValueVisibility: collectionValueVisibilityDictionaryType;
};
/**
 * カラータイプのコレクションアイテム取得関数の引数オブジェクトの型(引数)
 */
export type DenormalizeColorCollectionItemArgType = DenormalizeBaseCollectionItemArgType & {
  readonly collectionValueColor: collectionValueColorDictionaryType;
};
/**
 * 画像タイプのコレクションアイテム取得関数の引数オブジェクトの型(引数)
 */
export type DenormalizeImageCollectionItemArgType = DenormalizeBaseCollectionItemArgType & {
  readonly collectionValueImage: collectionValueImageDictionaryType;
};
/**
 * すべてのコレクションアイテム取得用の関数の引数objectの型(引数)
 */
export type DenormalizeCollectionItemArgType =
  | DenormalizeImageCollectionItemArgType
  | DenormalizeColorCollectionItemArgType;

/**
 * typeがcolorのコレクションアイテムの型(返り値)
 */
export type DenormalizedColorCollectionItemType = {
  id: string;
  type: 'color';
  blendMode: collectionValueBlendModeValueType;
  opacity: collectionValueOpacityValueType;
  color: collectionValueColorValueType;
  visibility: collectionValueVisibilityValueType;
};
/**
 * typeがimageのコレクションアイテムの型(返り値)
 */
export type DenormalizedImageCollectionItemType = {
  id: string;
  type: 'image';
  blendMode: collectionValueBlendModeValueType;
  opacity: collectionValueOpacityValueType;
  image: collectionValueImageValueType;
  visibility: collectionValueVisibilityValueType;
};
/**
 * コレクションアイテムの型(返り値)
 */
export type DenormalizedCollectionItemType =
  | DenormalizedColorCollectionItemType
  | DenormalizedImageCollectionItemType;

/**
 * コレクションアイテムのデータを非正規化する
 * @todo inで型を識別しているところの型判別を強化するか、もし違う値ならエラーを出したいです。
 */
export const getDenormalizedCollectionItem = (
  argumentCollectionItemId: IdType,
  argumentMultipleDataObject: DenormalizeCollectionItemArgType
): DenormalizedCollectionItemType => {
  if (!uuidValidate(argumentCollectionItemId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  const {
    collectionItem,
    collectionValueOpacity,
    collectionValueVisibility,
    collectionValueBlendMode,
  } = argumentMultipleDataObject;
  const targetIdCollectionItem = collectionItem[argumentCollectionItemId];
  if (targetIdCollectionItem == null) {
    throw new Error(errorMessageText.notFoundCollectionItem);
  }

  /**
   * 最終結果オブジェクトのベースとなるオブジェクト
   */
  const baseObject = {
    blendMode: getDenormalizedValue(
      targetIdCollectionItem.blendMode,
      collectionValueBlendMode
    ).value,
    opacity: getDenormalizedValue(
      targetIdCollectionItem.opacity,
      collectionValueOpacity
    ).value,
    visibility: getDenormalizedValue(
      targetIdCollectionItem.visibility,
      collectionValueVisibility
    ).value,
  };

  if (
    targetIdCollectionItem.type === 'color' &&
    'collectionValueColor' in argumentMultipleDataObject
  ) {
    const { collectionValueColor } = argumentMultipleDataObject;
    return {
      id: targetIdCollectionItem.id,
      type: targetIdCollectionItem.type,
      color: getDenormalizedValue(
        targetIdCollectionItem.color,
        collectionValueColor
      ).value,
      ...baseObject,
    };
  }

  if (
    targetIdCollectionItem.type === 'image' &&
    'collectionValueImage' in argumentMultipleDataObject
  ) {
    const { collectionValueImage } = argumentMultipleDataObject;
    return {
      id: targetIdCollectionItem.id,
      type: targetIdCollectionItem.type,
      image: getDenormalizedValue(
        targetIdCollectionItem.image,
        collectionValueImage
      ).value,
      ...baseObject,
    };
  }

  throw new Error('not correct data structure');
};

/**
 * カラーコレクションアイテムのデータを非正規化する
 */
export const getDenormalizedColorValueCollectionItem = (
  argumentCollectionItemId: IdType,
  argumentMultipleDataObject: DenormalizeColorCollectionItemArgType
): DenormalizedColorCollectionItemType => {
  const resultObject = getDenormalizedCollectionItem(
    argumentCollectionItemId,
    argumentMultipleDataObject
  );
  if (resultObject.type === 'color') {
    return resultObject;
  }
  throw new Error('not correct result type');
};

/**
 * 画像コレクションアイテムのデータを非正規化する
 */
export const getDenormalizedImageValueCollectionItem = (
  argumentCollectionItemId: IdType,
  argumentMultipleDataObject: DenormalizeImageCollectionItemArgType
): DenormalizedImageCollectionItemType => {
  const resultObject = getDenormalizedCollectionItem(
    argumentCollectionItemId,
    argumentMultipleDataObject
  );
  if (resultObject.type === 'image') {
    return resultObject;
  }
  throw new Error('not correct result type');
};
