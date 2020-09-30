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

export const denormalizeSceneCollection = (
  argumentSceneCollectionId: IdType,
  argumentMultipleDataObject: DenormalizedSceneCollectionArgsObjectType
): GlCollectionType[] => {
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

  const resultSceneCollectionArray = targetIdSceneCollection.innerCollectionId.map(
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
          throw new Error('not reachable');
      }
    }
  );
  return resultSceneCollectionArray;
};

export default denormalizeSceneCollection;
