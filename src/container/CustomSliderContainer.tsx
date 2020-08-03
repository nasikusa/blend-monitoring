import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpacitySlider from '../components/molecules/OpacitySlider';

import { updateOpacity as updateOpacityAction } from '../stores/collectionData';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/Collections';

export default (props: any) => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const globalStateOpacityData = collectionData[glCollectionOrderKey].opacity;

  const dispatch = useDispatch();

  const updateOpacity = React.useCallback(
    (value) => {
      dispatch(updateOpacityAction(value));
    },
    [dispatch]
  );

  const combineProps = {
    collectionData,
    updateOpacity,
    glCollectionOrderKey,
    globalStateOpacityData,
    ...props,
  };

  return <OpacitySlider {...combineProps} />;
};
