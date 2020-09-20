import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ImagePanel from '../components/molecules/ImagePanel';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/CollectionList/CollectionList';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default () => {
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const currentSingleCollectionData = collectionData[glCollectionOrderKey];
  let globalStateImageData =
    currentSingleCollectionData.roughType === 'image'
      ? currentSingleCollectionData.image
      : null;
  if (!Array.isArray(globalStateImageData) && globalStateImageData != null) {
    globalStateImageData = [globalStateImageData];
  }
  if (globalStateImageData == null) {
    globalStateImageData = [];
  }

  const combineProps = { storedMediaData, globalStateImageData };

  return <ImagePanel {...combineProps} />;
};
