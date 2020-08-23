import {
  GlCollectionTypeArray,
  CollectionTypeType,
  GlCollectionType,
} from '../stores/collectionData';

/**
 * すべてのコレクションデータのうち、マルチアイテムになるものがあるかどうかを返すと同時に
 * 、マルチアイテムのコレクションを返す
 */
export default (
  collectionData: GlCollectionTypeArray
): [boolean, GlCollectionType | undefined] => {
  const hasMultiItemCollectionNames: CollectionTypeType[] = [
    'singleColorMultiBlends',
    'multiColors',
    'singleImageMultiBlends',
    'multiImages',
  ];

  const hasMultiItemCollectionData = collectionData.find(
    (singleCollectionData) => {
      const searchTargetType: CollectionTypeType = singleCollectionData.type;
      const resultBoolean = hasMultiItemCollectionNames.includes(
        searchTargetType
      );

      return resultBoolean;
    }
  );

  const hasMultiItemCollectionBoolean = hasMultiItemCollectionData != null;

  return [hasMultiItemCollectionBoolean, hasMultiItemCollectionData];
};
