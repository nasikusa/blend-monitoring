import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlendModalContents from '../components/molecules/BlendModalContents';

import { updateBlendMode as updateBlendModeAction } from '../stores/collectionData';
import { AppState } from '../stores/index';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default (props: any) => {
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);
  const dispatch = useDispatch();

  const updateBlendMode = React.useCallback(
    (value) => {
      dispatch(updateBlendModeAction(value));
    },
    [dispatch]
  );

  const combineProps = {
    collectionData,
    updateBlendMode,
    blendModeOrder,
    ...props,
  };

  return <BlendModalContents {...combineProps} />;
};
