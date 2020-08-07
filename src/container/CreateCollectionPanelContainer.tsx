import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../stores/index';
import CreateCollectionPanel from '../components/molecules/CreateCollectionPanel';

import canMultiItemCollectionName from '../constants/canMultiItemCollectionName';
import { createCollection as createCollectionAction } from '../stores/collectionData';

export default () => {
  const dispatch = useDispatch();
  const multiCollectionData = useSelector(
    (state: AppState) => state.collectionData
  );

  const hasMultiItemCollection = multiCollectionData.some(
    (singleCollectionData) => {
      if (canMultiItemCollectionName.includes(singleCollectionData.type)) {
        return true;
      }
      return false;
    }
  );

  const createCollection = React.useCallback(
    (val) => {
      dispatch(createCollectionAction(val));
    },
    [dispatch]
  );

  const combineProps = { createCollection, hasMultiItemCollection };

  return <CreateCollectionPanel {...combineProps} />;
};
