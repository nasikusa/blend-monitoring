import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpacitySlider from '../components/molecules/OpacitySlider';

import { updateOpacity as updateOpacityAction } from '../stores/collectionData';
import { AppState } from '../stores/index';

export default (props: any) => {
  const collectionData = useSelector((state: AppState) => state.collectionData);

  const dispatch = useDispatch();

  const updateOpacity = React.useCallback(
    (value) => {
      dispatch(updateOpacityAction(value));
    },
    [dispatch]
  );

  const combineProps = { collectionData, updateOpacity, ...props };

  return <OpacitySlider {...combineProps} />;
};
