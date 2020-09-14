import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../stores/index';
import CreateCollectionPanel from '../components/molecules/CreateCollectionPanel';

import canMultiItemCollectionName from '../constants/collection/canMultiItemCollectionName';
import { createCollection as createCollectionAction } from '../types/collection/collectionData';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default (props: any) => {
  const dispatch = useDispatch();
  const multiCollectionData = useCurrentSceneCollection();
  const presetCollectionValue = useSelector(
    (state: AppState) => state.presetCollectionValue
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

  const combineProps = {
    createCollection,
    hasMultiItemCollection,
    presetCollectionValue,
    ...props,
  };

  return <CreateCollectionPanel {...combineProps} />;
};
