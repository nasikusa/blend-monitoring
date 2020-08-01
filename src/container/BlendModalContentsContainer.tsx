import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlendModalContents from '../components/molecules/BlendModalContents';

import { updateBlendMode as updateBlendModeAction } from '../stores/collectionData';
import { AppState } from '../stores/index';

export default (props: any) => {
  const collectionData = useSelector((state: AppState) => state.collectionData);

  const dispatch = useDispatch();

  const updateBlendMode = React.useCallback(
    (value) => {
      dispatch(updateBlendModeAction(value));
    },
    [dispatch]
  );

  const combineProps = { collectionData, updateBlendMode, ...props };

  return <BlendModalContents {...combineProps} />;
};
