import React from 'react';
import { useSelector } from 'react-redux';
import MediaModal from '../components/molecules/MediaModal';
import { AppState } from '../stores/index';

export default (props: any) => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);

  const combineProps = { storedMediaData, collectionData, ...props };

  return <MediaModal {...combineProps} />;
};
