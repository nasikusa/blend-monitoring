import { CollectionTypeType } from '../../types/collection/collectionData';

/**
 * en: An array of collection types that may have multiple drawing items
 * ja: 複数の描画アイテムを持つ可能性のあるcollectionのタイプの配列
 */
const canMultiItemCollectionName: CollectionTypeType[] = [
  'singleImageMultiBlends',
  'multiImages',
  'singleColorMultiBlends',
  'multiColors',
];

export default canMultiItemCollectionName;
