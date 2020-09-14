import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stores/index';
import ColorModal from '../components/molecules/ColorModal';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default (props: any) => {
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);

  const combineProps = {
    storedMediaData,
    collectionData,
    ...props,
  };

  return <ColorModal {...combineProps} />;
};
