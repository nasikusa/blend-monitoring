import {
  GlCollectionTypeArray,
  GlCollectionType,
} from '../../stores/collectionData';

/**
 * 空要素を持つかどうかを判定するための関数
 * @param multiCollectionData
 * @return 空の要素を持つマルチコレクションであるかどうかを返す (空要素を持っていればfalse、空要素がなければtrueを返す)
 */
export default function isEmptyMultiCollections(
  multiCollectionData: GlCollectionTypeArray
): boolean {
  return multiCollectionData.every((singleCollectionData: GlCollectionType) => {
    switch (singleCollectionData.type) {
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
  });
}
