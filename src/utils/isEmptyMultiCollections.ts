import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../stores/collectionData';

export default function isEmptyMultiCollections(
  multiCollectionData: GlCollectionInterfaceArray
): boolean {
  return multiCollectionData.every(
    (singleCollectionData: GlCollectionInterface) => {
      const { type } = singleCollectionData;
      switch (type) {
        case 'singleImage':
          return singleCollectionData.image != null;
        case 'singleImageMultiBlends':
          return (
            singleCollectionData.image != null &&
            singleCollectionData.blendMode.length > 0
          );
        case 'multiImages':
          return (
            singleCollectionData.image != null &&
            singleCollectionData.image.length > 0
          );
        case 'singleColor':
          return singleCollectionData.color != null;
        case 'singleColorMultiBlends':
          return (
            singleCollectionData.color != null &&
            singleCollectionData.blendMode.length > 0
          );
        case 'multiColors':
          return (
            singleCollectionData.color != null &&
            singleCollectionData.color.length > 0
          );
        default:
          return false;
      }
    }
  );
}
