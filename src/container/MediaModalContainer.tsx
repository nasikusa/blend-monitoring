import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MediaModal from '../components/molecules/MediaModal';
import { AppState } from '../stores/index';
import { addMediaData as addMediaDataAction } from '../stores/storedMedia';

export default (props: any) => {
  const dispatch = useDispatch();
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);

  const addMediaData = React.useCallback(
    (val) => {
      dispatch(addMediaDataAction(val));
    },
    [dispatch]
  );

  const combineProps = {
    storedMediaData,
    collectionData,
    addMediaData,
    ...props,
  };

  return <MediaModal {...combineProps} />;
};
