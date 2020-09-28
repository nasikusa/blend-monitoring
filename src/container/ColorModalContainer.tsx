import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import useCurrentSceneCollection from 'hooks/collection/useCurrentSceneCollection';
import ColorModal from 'components/molecules/ColorModal';
/* eslint-enable import/no-unresolved */

export default (props: any) => {
  const collectionData = useCurrentSceneCollection();
  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );

  const combineProps = {
    storedMediaData,
    collectionData,
    ...props,
  };

  return <ColorModal {...combineProps} />;
};
