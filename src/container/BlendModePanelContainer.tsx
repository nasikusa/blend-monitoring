import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlendMode as updateBlendModeAction,
  GlCollectionTypeArray,
} from '../stores/collectionData';
import { AppState } from '../stores/index';
import BlendModePanel from '../components/molecules/BlendModePanel';

export default () => {
  const collectionData: GlCollectionTypeArray = useSelector(
    (state: AppState) => state.collectionData as GlCollectionTypeArray
  );
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
