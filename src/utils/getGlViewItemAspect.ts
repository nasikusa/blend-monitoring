import {
  GlCollectionTypeArray,
  GlCollectionType,
} from '../stores/collectionData';
import { StoredMediaStateType } from '../stores/storedMedia';

export default (
  collectionData: GlCollectionTypeArray,
  storedMediaData: StoredMediaStateType,
  targetImageID?: string
): number => {
  const defaultAspectValue = 1.0;
  const resultAspectArray = collectionData.map(
    (singleCollectionItemData: GlCollectionType): number => {
      switch (singleCollectionItemData.type) {
        case 'singleColor':
        case 'singleColorMultiBlends':
        case 'multiColors':
        case 'multiImages':
          return defaultAspectValue;
        case 'singleImage':
        case 'singleImageMultiBlends': {
          const collectionItemImageID =
            singleCollectionItemData.image || targetImageID;
          const aspectValue =
            collectionItemImageID != null
              ? storedMediaData[collectionItemImageID].aspectRatio
              : defaultAspectValue;
          return aspectValue;
        }
        default:
          return defaultAspectValue;
      }
    }
  );
  const isAllDefaultAspectValue = resultAspectArray.every(
    (value) => value === defaultAspectValue
  );
  if (isAllDefaultAspectValue || collectionData.length === 0) {
    return defaultAspectValue;
  }
  const notDefaultValueAspect = resultAspectArray.find(
    (value) => value !== defaultAspectValue
  );

  if (notDefaultValueAspect != null) {
    return notDefaultValueAspect;
  }

  return defaultAspectValue;
};
