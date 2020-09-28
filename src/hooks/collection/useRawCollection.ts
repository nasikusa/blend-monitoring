import { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import CollectionIdContext from 'contexts/CollectionIdContext';
/* eslint-enable import/no-unresolved */

const useRawCollection = () => {
  const collectionIdContextValue = useContext(CollectionIdContext);

  const rawCollectionData = useSelector(
    (state: AppState) =>
      state.collection[collectionIdContextValue.collectionId],
    shallowEqual
  );
  return rawCollectionData;
};

export default useRawCollection;
