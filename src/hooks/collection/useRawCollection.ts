import { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import CollectionIdContext from 'contexts/CollectionIdContext';
/* eslint-enable import/no-unresolved */

/**
 * en: A hook that retrieves the raw collection data as it is denormalized
 * ja: 非正規化されていないままのそのままのcollectionのデータを取得するhook
 * @param targetCollectionId Collection ID / コレクションのID
 */
const useRawCollection = (targetCollectionId: string | null = null) => {
  const collectionIdContextValue = useContext(CollectionIdContext);
  if (!collectionIdContextValue)
    throw new Error("useRawCollection can't find CollectionIdContext");

  const rawCollectionData = useSelector(
    (state: AppState) =>
      state.collection[
        targetCollectionId != null
          ? targetCollectionId
          : collectionIdContextValue.collectionId
      ],
    shallowEqual
  );
  return rawCollectionData;
};

export default useRawCollection;
