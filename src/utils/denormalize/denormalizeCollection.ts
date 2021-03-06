import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../../constants/develop/errorMessageText';
// collection
import { GlCollectionDictionaryType } from '../../stores/collection/collection';
// collectionItem
import {
  getDenormalizedColorValueCollectionItem,
  getDenormalizedImageValueCollectionItem,
  DenormalizeColorCollectionItemArgType,
  DenormalizeImageCollectionItemArgType,
  DenormalizeCollectionItemArgType,
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
} from '../../types/collection/collectionData';

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
 * 非正規化されたcollectionデータを取得する
 * @todo inで型を識別しているところの型判別を強化するか、もし違う値ならエラーを出したいです。
 */
export const getDenormalizedCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject:
    | DenormalizedColorCollectionArgsObjectType
    | DenormalizedImageCollectionArgsObjectType
): GlCollectionType => {
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
      targetIdCollection.innerItemId,
      {
        collectionItem,
        collectionValueOpacity,
        collectionValueColor,
        collectionValueVisibility,
        collectionValueBlendMode,
      }
    );
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

  // singleImage
  if (
    targetIdCollection.type === 'singleImage' &&
    'collectionValueImage' in argumentMultipleDataObject
  ) {
    const { collectionValueImage } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItem = getDenormalizedImageValueCollectionItem(
      targetIdCollection.innerItemId,
      {
        collectionItem,
        collectionValueOpacity,
        collectionValueImage,
        collectionValueVisibility,
        collectionValueBlendMode,
      }
    );
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

  // singleColorMultiBlends || multiColors
  if (
    (targetIdCollection.type === 'singleColorMultiBlends' ||
      targetIdCollection.type === 'multiColors') &&
    'collectionValueColor' in argumentMultipleDataObject
  ) {
    const { collectionValueColor } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItemArray = targetIdCollection.innerItemId.map(
      (singleInnerIdValue) =>
        getDenormalizedColorValueCollectionItem(singleInnerIdValue, {
          collectionItem,
          collectionValueOpacity,
          collectionValueColor,
          collectionValueVisibility,
          collectionValueBlendMode,
        })
    );
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

  // singleImageMultiBlends || multiImages
  if (
    (targetIdCollection.type === 'singleImageMultiBlends' ||
      targetIdCollection.type === 'multiImages') &&
    'collectionValueImage' in argumentMultipleDataObject
  ) {
    const { collectionValueImage } = argumentMultipleDataObject;
    const denormalizedTargetIdCollectionItemArray = targetIdCollection.innerItemId.map(
      (singleInnerIdValue) =>
        getDenormalizedImageValueCollectionItem(singleInnerIdValue, {
          collectionItem,
          collectionValueOpacity,
          collectionValueImage,
          collectionValueVisibility,
          collectionValueBlendMode,
        })
    );
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
  throw new Error('not reachable error');
};

export const getDenormalizedSingleColorCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedColorCollectionArgsObjectType
): SingleColorGlCollectionType => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData.type === 'singleColor') {
    return collectionData;
  }
  throw new Error('not reachable');
};

export const getDenormalizedSingleColorMultiBlendsCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedColorCollectionArgsObjectType
): SingleColorMultiBlendsGlCollectionType => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData.type === 'singleColorMultiBlends') {
    return collectionData;
  }
  throw new Error('not reachable');
};

export const getDenormalizedMultiColorCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedColorCollectionArgsObjectType
): MultiColorsGlCollectionType => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData.type === 'multiColors') {
    return collectionData;
  }
  throw new Error('not reachable');
};

export const getDenormalizedSingleImageCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedImageCollectionArgsObjectType
): SingleImageGlCollectionType => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData.type === 'singleImage') {
    return collectionData;
  }
  throw new Error('not reachable');
};

export const getDenormalizedSingleImageMultiBlendsCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedImageCollectionArgsObjectType
): SingleImageMultiBlendsGlCollectionType => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData.type === 'singleImageMultiBlends') {
    return collectionData;
  }
  throw new Error('not reachable');
};

export const getDenormalizedMultiImageCollection = (
  argumentCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedImageCollectionArgsObjectType
): MultiImagesGlCollectionType => {
  const collectionData = getDenormalizedCollection(
    argumentCollectionId,
    argumentMultipleDataObject
  );
  if (collectionData.type === 'multiImages') {
    return collectionData;
  }
  throw new Error('not reachable');
};
