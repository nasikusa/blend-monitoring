import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../../constants/develop/errorMessageText';
// collection
import { GlCollectionDictionaryType } from '../../stores/collection';
// collectionItem
import {
  getDenormalizedColorValueCollectionItem,
  getDenormalizedImageValueCollectionItem,
  DenormalizeColorCollectionItemArgType,
  DenormalizeImageCollectionItemArgType,
  DenormalizeCollectionItemArgType,
  DenormalizedColorCollectionItemType,
  DenormalizedImageCollectionItemType,
} from './denormalizeCollectionItem';
// collectionData
import {
  IdType,
  GlCollectionType,
  SingleColorGlCollectionType,
  SingleColorMultiBlendsGlCollectionType,
  MultiColorsGlCollectionType,
  SingleImageGlCollectionType,
  SingleImageMultiBlendsGlCollectionType,
  MultiImagesGlCollectionType,
} from '../../stores/collectionData';

/**
 * カラータイプのコレクション取得用の関数の引数objectの型
 */
export type DenormalizedColorCollectionArgsObjectType = DenormalizeColorCollectionItemArgType & {
  readonly collection: GlCollectionDictionaryType;
};
/**
 * 画像タイプのコレクション取得用の関数の引数objectの型
 */
export type DenormalizedImageCollectionArgsObjectType = DenormalizeImageCollectionItemArgType & {
  readonly collection: GlCollectionDictionaryType;
};
/**
 * コレクション取得用の関数の引数objectの型
 */
export type DenormalizedCollectionArgsObjectType = DenormalizeCollectionItemArgType & {
  readonly collection: GlCollectionDictionaryType;
};

/**
 * undefined[]の型を弾くためのタイプガード関数
 */
export function isNonNullableCollectionItemArray<T>(
  collectionItemArray: (T | undefined)[]
): collectionItemArray is T[] {
  const isNotNullableArray = collectionItemArray != null;
  const isNotNullableCollectionItems = collectionItemArray.every(
    (singleCollectionItem) => singleCollectionItem != null
  );
  return isNotNullableArray && isNotNullableCollectionItems;
}

/**
 * 非正規化されたcollectionデータを取得する
 * @todo inで型を識別しているところの型判別を強化するか、もし違う値ならエラーを出したいです。
 */
export const getDenormalizedCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject:
    | DenormalizedColorCollectionArgsObjectType
    | DenormalizedImageCollectionArgsObjectType
): GlCollectionType | undefined => {
  if (!uuidValidate(argumentCollectionId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  const {
    collection,
    collectionItem,
    collectionValueOpacity,
    collectionValueVisibility,
    collectionValueBlendMode,
  } = argumentMultipleDataObject;
  const targetIdCollection = collection[argumentCollectionId];
  if (targetIdCollection == null) {
    throw new Error(errorMessageText.notFoundCollection);
  }

  // singleColor
  if (
    targetIdCollection.type === 'singleColor' &&
    'collectionValueColor' in argumentMultipleDataObject
  ) {
    const { collectionValueColor } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItem = getDenormalizedColorValueCollectionItem(
      targetIdCollection.innerItemID,
      {
        collectionItem,
        collectionValueOpacity,
        collectionValueColor,
        collectionValueVisibility,
        collectionValueBlendMode,
      }
    );
    if (denormalizedTargetIdCollectionItem != null) {
      const {
        id: _notUsedIdData_,
        type: _notUsedTypeData_,
        ...omitedDenormalizedTargetIdCollectionItem
      } = denormalizedTargetIdCollectionItem;

      const resultObject = {
        ...targetIdCollection,
        ...omitedDenormalizedTargetIdCollectionItem,
      };
      return resultObject;
    }
    return undefined;
  }

  // singleImage
  if (
    targetIdCollection.type === 'singleImage' &&
    'collectionValueImage' in argumentMultipleDataObject
  ) {
    const { collectionValueImage } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItem = getDenormalizedImageValueCollectionItem(
      targetIdCollection.id,
      {
        collectionItem,
        collectionValueOpacity,
        collectionValueImage,
        collectionValueVisibility,
        collectionValueBlendMode,
      }
    );
    if (denormalizedTargetIdCollectionItem != null) {
      const {
        id: _notUsedIdData_,
        type: _notUsedTypeData_,
        ...omitedDenormalizedTargetIdCollectionItem
      } = denormalizedTargetIdCollectionItem;

      const resultObject = {
        ...targetIdCollection,
        ...omitedDenormalizedTargetIdCollectionItem,
      };
      return resultObject;
    }
    return undefined;
  }

  // singleColorMultiBlends || multiColors
  if (
    (targetIdCollection.type === 'singleColorMultiBlends' ||
      targetIdCollection.type === 'multiColors') &&
    'collectionValueColor' in argumentMultipleDataObject
  ) {
    const { collectionValueColor } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItemArray = targetIdCollection.innerItemID.map(
      (singleInnerIdValue) =>
        getDenormalizedColorValueCollectionItem(singleInnerIdValue, {
          collectionItem,
          collectionValueOpacity,
          collectionValueColor,
          collectionValueVisibility,
          collectionValueBlendMode,
        })
    );
    if (
      isNonNullableCollectionItemArray<DenormalizedColorCollectionItemType>(
        denormalizedTargetIdCollectionItemArray
      )
    ) {
      const resultObject = {
        ...targetIdCollection,
        opacity: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.opacity
        ),
        blendMode: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.blendMode
        ),
        color: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.color
        ),
        visibility: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.visibility
        ),
      };
      return resultObject;
    }
    return undefined;
  }

  // singleImageMultiBlends || multiImages
  if (
    (targetIdCollection.type === 'singleImageMultiBlends' ||
      targetIdCollection.type === 'multiImages') &&
    'collectionValueImage' in argumentMultipleDataObject
  ) {
    const { collectionValueImage } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItemArray = targetIdCollection.innerItemID.map(
      (singleInnerIdValue) =>
        getDenormalizedImageValueCollectionItem(singleInnerIdValue, {
          collectionItem,
          collectionValueOpacity,
          collectionValueImage,
          collectionValueVisibility,
          collectionValueBlendMode,
        })
    );
    if (
      isNonNullableCollectionItemArray<DenormalizedImageCollectionItemType>(
        denormalizedTargetIdCollectionItemArray
      )
    ) {
      const resultObject = {
        ...targetIdCollection,
        opacity: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.opacity
        ),
        blendMode: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.blendMode
        ),
        image: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.image
        ),
        visibility: denormalizedTargetIdCollectionItemArray.map(
          (singleCollectionItem) => singleCollectionItem.visibility
        ),
      };
      return resultObject;
    }
    return undefined;
  }
  return undefined;
};

export const getDenormalizedSingleColorCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedColorCollectionArgsObjectType
): SingleColorGlCollectionType | undefined => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData?.type === 'singleColor') {
    return collectionData;
  }
  return undefined;
};

export const getDenormalizedSingleColorMultiBlendsCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedColorCollectionArgsObjectType
): SingleColorMultiBlendsGlCollectionType | undefined => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData?.type === 'singleColorMultiBlends') {
    return collectionData;
  }
  return undefined;
};

export const getDenormalizedMultiColorCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedColorCollectionArgsObjectType
): MultiColorsGlCollectionType | undefined => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData?.type === 'multiColors') {
    return collectionData;
  }
  return undefined;
};

export const getDenormalizedSingleImageCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedImageCollectionArgsObjectType
): SingleImageGlCollectionType | undefined => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData?.type === 'singleImage') {
    return collectionData;
  }
  return undefined;
};

export const getDenormalizedSingleImageMultiBlendsCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedImageCollectionArgsObjectType
): SingleImageMultiBlendsGlCollectionType | undefined => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData?.type === 'singleImageMultiBlends') {
    return collectionData;
  }
  return undefined;
};

export const getDenormalizedMultiImageCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedImageCollectionArgsObjectType
): MultiImagesGlCollectionType | undefined => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData?.type === 'multiImages') {
    return collectionData;
  }
  return undefined;
};
