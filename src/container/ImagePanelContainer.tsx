import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { useCollectionValueImage } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import ImagePanel from 'components/molecules/ImagePanel';
import { AppState } from 'stores/index';
/* eslint-enable import/no-unresolved */

const ImagePanelContainer = () => {
  const collectionIdContext = useCollectionIdContext();

  const storedImageValue = useCollectionValueImage(
    collectionIdContext.collectionId
  );

  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );

  const combineProps = {
    storedImageValue,
    storedMediaData,
  };

  return <ImagePanel {...combineProps} />;
};

export default ImagePanelContainer;
