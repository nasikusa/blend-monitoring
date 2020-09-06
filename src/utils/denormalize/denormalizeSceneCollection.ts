import { validate as uuidValidate } from 'uuid';

import errorMessageText from '../../constants/develop/errorMessageText';
// collectionData
import {
  IdType,
  GlCollectionType,
} from '../../types/collection/collectionData';
import { sceneCollectionsDictionaryType } from '../../stores/collection/sceneCollection';
import {
  DenormalizedCollectionArgsObjectType,
  getDenormalizedCollection,
} from './denormalizeCollection';
import { collectionValueImageDictionaryType } from '../../stores/collection/collectionValueImage';
import { collectionValueColorDictionaryType } from '../../stores/collection/collectionValueColor';

export type DenormalizedSceneCollectionArgsObjectType = DenormalizedCollectionArgsObjectType & {
  sceneCollection: sceneCollectionsDictionaryType;
  collectionValueImage: collectionValueImageDictionaryType;
  collectionValueColor: collectionValueColorDictionaryType;
};

/**
 * undefined[]の型を弾くためのタイプガード関数
 */
export function isNonNullableCollectionArray<T>(
  collectionItemArray: (T | undefined)[]
): collectionItemArray is T[] {
  const isNotNullableArray = collectionItemArray != null;
  const isNotNullableCollectionItems = collectionItemArray.every(
    (singleCollectionItem) => singleCollectionItem != null
  );
  return isNotNullableArray && isNotNullableCollectionItems;
}

export const denormalizeSceneCollection = (
  argumentSceneCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedSceneCollectionArgsObjectType
): GlCollectionType[] | undefined[] => {
  if (!uuidValidate(argumentSceneCollectionId)) {
    throw new Error(errorMessageText.notValidUUID);
  }
  const {
    sceneCollection,
    collection,
    collectionItem,
    collectionValueOpacity,
    collectionValueVisibility,
    collectionValueBlendMode,
    collectionValueImage,
    collectionValueColor,
  } = argumentMultipleDataObject;

  const targetIdSceneCollection = sceneCollection[argumentSceneCollectionId];
  if (targetIdSceneCollection == null) {
    throw new Error(errorMessageText.notFoundSceneCollection);
  }

  const resultSceneCollectionArray = targetIdSceneCollection.map(
    (singleCollectionId: string) => {
      const targetIdCollection = collection[singleCollectionId];
      switch (targetIdCollection.type) {
        case 'singleColor':
        case 'singleColorMultiBlends':
        case 'multiColors': {
          const denormalizedTargetIdCollection = getDenormalizedCollection(
            singleCollectionId,
            {
              collection,
              collectionItem,
              collectionValueOpacity,
              collectionValueVisibility,
              collectionValueBlendMode,
              collectionValueColor,
            }
          );
          return denormalizedTargetIdCollection;
        }
        case 'singleImage':
        case 'singleImageMultiBlends':
        case 'multiImages': {
          const denormalizedTargetIdCollection = getDenormalizedCollection(
            singleCollectionId,
            {
              collection,
              collectionItem,
              collectionValueOpacity,
              collectionValueVisibility,
              collectionValueBlendMode,
              collectionValueImage,
            }
          );
          return denormalizedTargetIdCollection;
        }
        default:
          return undefined;
      }
    }
  );

  if (
    isNonNullableCollectionArray<GlCollectionType>(resultSceneCollectionArray)
  ) {
    return resultSceneCollectionArray;
  }
  return [];
};

export default denormalizeSceneCollection;
