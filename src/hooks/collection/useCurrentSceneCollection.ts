import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import useSceneCollection from './useSceneCollection';
import { GlCollectionType } from '../../types/collection/collectionData';

/**
 * 現在のシーンコレクション内のデータを非正規化して取得するhook
 * *パフォーマンス的に良くないため、将来削除する予定*
 */
const useCurrentSceneCollection = (): GlCollectionType[] => {
  const currentSceneCollection = useSelector(
    (state: AppState) => state.currentSceneCollection
  );
  const resultObject = useSceneCollection(currentSceneCollection.currentId);
  return resultObject;
};

export default useCurrentSceneCollection;
