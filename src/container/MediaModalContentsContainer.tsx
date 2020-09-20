import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MediaModalContents from '../components/molecules/MediaModalContents';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/CollectionList/CollectionList';
import { updateSingleItemAspect as updateSingleItemAspectAction } from '../stores/general/glSettings';
import { updateImages as updateImagesAction } from '../types/collection/collectionData';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default (props: any) => {
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
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

  const updateSingleItemAspect = React.useCallback(
    (val) => {
      dispatch(updateSingleItemAspectAction(val));
    },
    [dispatch]
  );

  const combineProps = {
    storedMediaData,
    collectionStateImageData,
    updateImages,
    glCollectionOrderKey,
    updateSingleItemAspect,
    collectionData,
    ...props,
  };

  return <MediaModalContents {...combineProps} />;
};
