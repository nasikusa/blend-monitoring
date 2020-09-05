import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../../constants/develop/errorMessageText';
// collectionValue
import {
  collectionItemValueOpacityDictionaryType,
  collectionItemValueOpacityType,
} from '../../stores/collectionValueOpacity';
import {
  collectionItemValueColorDictionaryType,
  collectionItemValueColorType,
} from '../../stores/collectionValueColor';
import {
  collectionItemValueImageDictionaryType,
  collectionItemValueImageType,
} from '../../stores/collectionValueImage';
import {
  collectionItemValueVisibilityDictionaryType,
  collectionItemValueVisibilityType,
} from '../../stores/collectionValueVisibility';
import {
  collectionItemValueBlendModeDictionaryType,
  collectionItemValueBlendModeType,
} from '../../stores/collectionValueBlendMode';
// collectionValue
import {
  getDenormalizedOpacityValue,
  getDenormalizedColorValue,
  getDenormalizedImageValue,
  getDenormalizedVisibilityValue,
  getDenormalizedBlendModeValue,
} from './denormalizeCollectionValue';
// collectionItem
import { collectionItemDictionaryType } from '../../stores/collectionItem';
// collectionData
import { IdType } from '../../stores/collectionData';

/**
 * コレクションアイテム取得関数のベースとなる必須引数オブジェクトの型(引数)
 */
export type DenormalizeBaseCollectionItemArgType = {
  readonly collectionItem: collectionItemDictionaryType;
  readonly collectionValueOpacity: collectionItemValueOpacityDictionaryType;
  readonly collectionValueBlendMode: collectionItemValueBlendModeDictionaryType;
  readonly collectionValueVisibility: collectionItemValueVisibilityDictionaryType;
};
/**
 * カラータイプのコレクションアイテム取得関数の引数オブジェクトの型(引数)
 */
export type DenormalizeColorCollectionItemArgType = DenormalizeBaseCollectionItemArgType & {
  readonly collectionValueColor: collectionItemValueColorDictionaryType;
};
/**
 * 画像タイプのコレクションアイテム取得関数の引数オブジェクトの型(引数)
 */
export type DenormalizeImageCollectionItemArgType = DenormalizeBaseCollectionItemArgType & {
  readonly collectionValueImage: collectionItemValueImageDictionaryType;
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
  blendMode: collectionItemValueBlendModeType;
  opacity: collectionItemValueOpacityType;
  color: collectionItemValueColorType;
  visibility: collectionItemValueVisibilityType;
};
/**
 * typeがimageのコレクションアイテムの型(返り値)
 */
export type DenormalizedImageCollectionItemType = {
  id: string;
  type: 'image';
  blendMode: collectionItemValueBlendModeType;
  opacity: collectionItemValueOpacityType;
  image: collectionItemValueImageType;
  visibility: collectionItemValueVisibilityType;
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
): DenormalizedCollectionItemType | undefined => {
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
    blendMode: getDenormalizedBlendModeValue(
      targetIdCollectionItem.blendMode,
      collectionValueBlendMode
    ),
    opacity: getDenormalizedOpacityValue(
      targetIdCollectionItem.opacity,
      collectionValueOpacity
    ),
    visibility: getDenormalizedVisibilityValue(
      targetIdCollectionItem.visibility,
      collectionValueVisibility
    ),
  };

  switch (targetIdCollectionItem.type) {
    case 'color': {
      if ('collectionValueColor' in argumentMultipleDataObject) {
        const { collectionValueColor } = argumentMultipleDataObject;
        return {
          id: targetIdCollectionItem.id,
          type: targetIdCollectionItem.type,
          color: getDenormalizedColorValue(
            targetIdCollectionItem.color,
            collectionValueColor
          ),
          ...baseObject,
        };
      }
      return undefined;
    }
    case 'image':
      if ('collectionValueImage' in argumentMultipleDataObject) {
        const { collectionValueImage } = argumentMultipleDataObject;
        return {
          id: targetIdCollectionItem.id,
          type: targetIdCollectionItem.type,
          image: getDenormalizedImageValue(
            targetIdCollectionItem.image,
            collectionValueImage
          ),
          ...baseObject,
        };
      }
      return undefined;
    default:
      return undefined;
  }
};

/**
 * カラーコレクションアイテムのデータを非正規化する
 */
export const getDenormalizedColorValueCollectionItem = (
  argumentCollectionItemId: IdType,
  argumentMultipleDataObject: DenormalizeColorCollectionItemArgType
): DenormalizedColorCollectionItemType | undefined => {
  const resultObject = getDenormalizedCollectionItem(
    argumentCollectionItemId,
    argumentMultipleDataObject
  );
  if (resultObject?.type === 'color') {
    return resultObject;
  }
  return undefined;
};

/**
 * 画像コレクションアイテムのデータを非正規化する
 */
export const getDenormalizedImageValueCollectionItem = (
  argumentCollectionItemId: IdType,
  argumentMultipleDataObject: DenormalizeImageCollectionItemArgType
): DenormalizedImageCollectionItemType | undefined => {
  const resultObject = getDenormalizedCollectionItem(
    argumentCollectionItemId,
    argumentMultipleDataObject
  );
  if (resultObject?.type === 'image') {
    return resultObject;
  }
  return undefined;
};
