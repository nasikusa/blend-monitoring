import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stores/index';
import ColorModal from '../components/molecules/ColorModal';

export default (props: any) => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);

  const combineProps = {
    storedMediaData,
    collectionData,
    ...props,
  };

  return <ColorModal {...combineProps} />;
};
