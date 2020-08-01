import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Collection from '../components/molecules/Collection';

import { AppState } from '../stores/index';
import { deleteSingleCollection as deleteSingleCollectionAction } from '../stores/collectionData';

export default () => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const dispatch = useDispatch();

  const deleteSingleCollection = useCallback(
    (value) => {
      dispatch(deleteSingleCollectionAction(value));
    },
    [dispatch]
  );

  const combineProps = { collectionData, deleteSingleCollection };

  return <Collection {...combineProps} />;
};
