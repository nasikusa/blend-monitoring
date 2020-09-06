import { GlCollectionTypeArray } from '../../types/collection/collectionData';

/**
 * コレクションリスト配列から、最大の個数を持つ innerItemId の内容を返す関数
 * 主にloopしているReact要素でのkeyの設定に使用
 */
export default (collectionData: GlCollectionTypeArray) => {
  /**
   * コレクションリストのコレクションから innerItemId のみを抽出した配列
   */
  const allInnerItemIdArray = collectionData.map((singleCollectionData) => {
    return singleCollectionData.innerItemID;
  });
  /**
   * allInnerItemIdArray のなかに一つでも string[]型があるかどうかのbool
   */
  const hasArrayIninnerItemIds = allInnerItemIdArray.some((innerId) => {
    if (Array.isArray(innerId)) {
      return true;
    }
    return false;
  });
  if (hasArrayIninnerItemIds) {
    /**
     * allInnerItemIdArrayの中の配列型のみの配列
     * @see: https://qiita.com/ttiger55/items/275e6213daa89e112f42
     */
    const innerItemIdArrayItem = allInnerItemIdArray.filter(
      (innerId): innerId is string[] => {
        if (Array.isArray(innerId)) {
          return true;
        }
        return false;
      }
    );
    // @see: https://qiita.com/PianoScoreJP/items/f0ff7345229871039672
    innerItemIdArrayItem.sort((a: string[] = [], b: string[] = []) => {
      if (a.length < b.length) return 1;
      if (a.length > b.length) return -1;
      return 0;
    });
    return innerItemIdArrayItem[0];
  }
  return allInnerItemIdArray[0];
};
