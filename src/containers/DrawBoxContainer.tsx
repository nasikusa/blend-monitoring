import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import DrawBox from 'components/organisms/DrawBox';
/* eslint-enable import/no-unresolved */

const DrawBoxContainer = () => {
  /**
   * en: Number of lines of items drawn
   * ja: 描画されるアイテムの行数
   */
  const drawBoxRowCount = useSelector(
    (state: AppState) => state.glSettings.rowCount
  );

  const currentSceneCollectionId = useSelector(
    (state: AppState) => state.currentSceneCollection.currentId
  );

  const currentCollectionsId = useSelector(
    (state: AppState) =>
      state.sceneCollection[currentSceneCollectionId].innerCollectionId,
    shallowEqual
  );

  /**
   * en: Contains the innerItemId of a collection that may have multiple drawing items (= array)
   * ja: 複数の描画アイテムを持つ可能性のある( =配列 )collectionのinnerItemIdが入る
   */
  let drawItemKeys: string[] = [];

  /**
   * en: Bool value for whether there is a collection that may have multiple drawing items
   * ja: 複数の描画アイテムを持つ可能性のあるcollectionが存在しているかどうかのbool値
   */
  let hasCanMultiCollectionType = false;

  const rawSceneCollectionInnerItemData = useSelector((state: AppState) => {
    return currentCollectionsId.map((singleCurrentCollectionId) => {
      const innerItemData =
        state.collection[singleCurrentCollectionId].innerItemId;
      if (!Array.isArray(innerItemData)) {
        return [innerItemData];
      }
      if (Array.isArray(innerItemData)) {
        // HACK: en: Problems can occur in the future if you have an array that doesn't have multiple collections
        // HACK: ja: 将来配列だけども、複数のコレクションを持たないようなものができた場合に問題が起こる可能性がある
        drawItemKeys = innerItemData;
        hasCanMultiCollectionType = true;
        return innerItemData;
      }
      return [];
    });
  }, shallowEqual);

  /**
   * en: Returns the maximum number of lengths in the collection's innerItemId array
   * ja: collectionのinnerItemIdの配列の中で最大の数のlengthを返す
   */
  const drawItemCountValue = (() => {
    if (rawSceneCollectionInnerItemData.length === 0) return 0;
    const InnerItemLengthArray = rawSceneCollectionInnerItemData.map(
      (singleInnerItemData) => {
        return singleInnerItemData.length;
      }
    );
    return Math.max(...InnerItemLengthArray);
  })();

  const combineProps = {
    drawItemCount: drawItemCountValue,
    drawItemKeys,
    drawBoxRowCount,
    hasCanMultiCollectionType,
  };

  return <DrawBox {...combineProps} />;
};

export default DrawBoxContainer;
