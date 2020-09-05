import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import OpacitySlider from '../components/molecules/OpacitySlider';

import { updateOpacity as updateOpacityAction } from '../stores/collectionData';
import { GlCollectionOrderContext } from '../components/molecules/Collections';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default (props: any) => {
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
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
