import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlendMode as updateBlendModeAction,
  // GlCollectionTypeArray,
} from '../types/collection/collectionData';
import { AppState } from '../stores/index';
import BlendModePanel from '../components/molecules/BlendModePanel';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default () => {
  // const collectionData: GlCollectionTypeArray = useSelector(
  //   (state: AppState) => state.collectionData as GlCollectionTypeArray
  // );
  const collectionData = useCurrentSceneCollection();
  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);
  const dispatch = useDispatch();

  const updateBlendMode = React.useCallback(
    (value) => {
      dispatch(updateBlendModeAction(value));
    },
    [dispatch]
  );

  const combineProps = { updateBlendMode, blendModeOrder, collectionData };

  return <BlendModePanel {...combineProps} />;
};
