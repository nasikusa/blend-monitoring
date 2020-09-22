import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../stores/index';
import CreateCollectionPanel from '../components/molecules/CreateCollectionPanel';

import canMultiItemCollectionName from '../constants/collection/canMultiItemCollectionName';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';
import { addSceneCollectionInnerItem } from '../stores/collection/sceneCollection';
import { addCollection } from '../stores/collection/collection';
import { addItem } from '../stores/collection/collectionItem';
import { addValue as addCollectionBlendModeValue } from '../stores/collection/collectionValueBlendMode';
import { addValue as addCollectionOpacity } from '../stores/collection/collectionValueOpacity';
import { addValue as addCollectionVisibility } from '../stores/collection/collectionValueVisibility';
import { addValue as addCollectionColor } from '../stores/collection/collectionValueColor';
import { addValue as addCollectionImage } from '../stores/collection/collectionValueImage';

export default (props: any) => {
  const dispatch = useDispatch();
  const multiCollectionData = useCurrentSceneCollection();
  const presetCollectionValue = useSelector(
    (state: AppState) => state.presetCollectionValue
  );
  const curerntSceneCollectionId = useSelector(
    (state: AppState) => state.currentSceneCollection.currentId
  );

  const hasMultiItemCollection = multiCollectionData.some(
    (singleCollectionData) => {
      if (canMultiItemCollectionName.includes(singleCollectionData.type)) {
        return true;
      }
      return false;
    }
  );

  const storeAddSceneCollectionInnerItem = React.useCallback(
    (payload) => {
      dispatch(addSceneCollectionInnerItem(payload));
    },
    [dispatch]
  );
  const storeAddCollection = React.useCallback(
    (payload) => {
      dispatch(addCollection(payload));
    },
    [dispatch]
  );
  const storeAddCollectionItem = React.useCallback(
    (payload) => {
      dispatch(addItem(payload));
    },
    [dispatch]
  );
  const storeAddCollectionBlendModeValue = React.useCallback(
    (payload) => {
      dispatch(addCollectionBlendModeValue(payload));
    },
    [dispatch]
  );
  const storeAddCollectionOpacityValue = React.useCallback(
    (payload) => {
      dispatch(addCollectionOpacity(payload));
    },
    [dispatch]
  );
  const storeAddCollectionVisibilityValue = React.useCallback(
    (payload) => {
      dispatch(addCollectionVisibility(payload));
    },
    [dispatch]
  );
  const storeAddCollectionColorValue = React.useCallback(
    (payload) => {
      dispatch(addCollectionColor(payload));
    },
    [dispatch]
  );
  const storeAddCollectionImageValue = React.useCallback(
    (payload) => {
      dispatch(addCollectionImage(payload));
    },
    [dispatch]
  );

  const combineProps = {
    curerntSceneCollectionId,
    hasMultiItemCollection,
    presetCollectionValue,
    storeAddSceneCollectionInnerItem,
    storeAddCollection,
    storeAddCollectionItem,
    storeAddCollectionBlendModeValue,
    storeAddCollectionOpacityValue,
    storeAddCollectionVisibilityValue,
    storeAddCollectionColorValue,
    storeAddCollectionImageValue,
    ...props,
  };

  return <CreateCollectionPanel {...combineProps} />;
};
