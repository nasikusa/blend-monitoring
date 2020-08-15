import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MediaModalContents from '../components/molecules/MediaModalContents';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/Collections';
import { updateImages as updateImagesAction } from '../stores/collectionData';

export default () => {
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const currentSingleCollectionData = collectionData[glCollectionOrderKey];
  let collectionStateImageData =
    currentSingleCollectionData.roughType === 'image'
      ? currentSingleCollectionData.image
      : null;
  if (
    !Array.isArray(collectionStateImageData) &&
    collectionStateImageData != null
  ) {
    collectionStateImageData = [collectionStateImageData];
  }
  if (collectionStateImageData == null) {
    collectionStateImageData = [];
  }

  const dispatch = useDispatch();

  const updateImages = React.useCallback(
    (value) => {
      dispatch(updateImagesAction(value));
    },
    [dispatch]
  );

  const combineProps = {
    storedMediaData,
    collectionStateImageData,
    updateImages,
    glCollectionOrderKey,
  };

  return <MediaModalContents {...combineProps} />;
};
