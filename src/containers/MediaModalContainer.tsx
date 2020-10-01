import React from 'react';
import { useDispatch } from 'react-redux';

/* eslint-disable import/no-unresolved */
import MediaModal from 'components/molecules/MediaModal';
import { addMediaData as addMediaDataAction } from 'stores/image/storedMedia';
/* eslint-enable import/no-unresolved */

const MediaModalContainer: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const addMediaData = React.useCallback(
    (val) => {
      dispatch(addMediaDataAction(val));
    },
    [dispatch]
  );

  const combineProps = {
    addMediaData,
    ...props,
  };

  return <MediaModal {...combineProps} />;
};

export default MediaModalContainer;
