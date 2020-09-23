import React, { useCallback } from 'react';
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

const CreateCollectionPanelContainer = (props: any) => {
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

  const storeAddSceneCollectionInnerItem = useCallback(
    (payload) => {
      dispatch(addSceneCollectionInnerItem(payload));
    },
    [dispatch]
  );
  const storeAddCollection = useCallback(
    (payload) => {
      dispatch(addCollection(payload));
    },
    [dispatch]
  );
  const storeAddCollectionItem = useCallback(
    (payload) => {
      dispatch(addItem(payload));
    },
    [dispatch]
  );
  const storeAddCollectionBlendModeValue = useCallback(
    (payload) => {
      dispatch(addCollectionBlendModeValue(payload));
    },
    [dispatch]
  );
  const storeAddCollectionOpacityValue = useCallback(
    (payload) => {
      dispatch(addCollectionOpacity(payload));
    },
    [dispatch]
  );
  const storeAddCollectionVisibilityValue = useCallback(
    (payload) => {
      dispatch(addCollectionVisibility(payload));
    },
    [dispatch]
  );
  const storeAddCollectionColorValue = useCallback(
    (payload) => {
      dispatch(addCollectionColor(payload));
    },
    [dispatch]
  );
  const storeAddCollectionImageValue = useCallback(
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

export default CreateCollectionPanelContainer;
