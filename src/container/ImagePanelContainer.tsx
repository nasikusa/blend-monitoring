import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ImagePanel from '../components/molecules/ImagePanel';

// import { updateImage as updateImageAction } from '../stores/collectionData';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/Collections';

export default () => {
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);
  const collectionData = useSelector((state: AppState) => state.collectionData);
  // const dispatch = useDispatch();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  let globalStateImageData = collectionData[glCollectionOrderKey].image;
  if (!Array.isArray(globalStateImageData) && globalStateImageData != null) {
    globalStateImageData = [globalStateImageData];
  }
  if (globalStateImageData == null) {
    globalStateImageData = [];
  }

  // const updateColor = React.useCallback(
  //   (val) => {
  //     dispatch(updateColorAction(val));
  //   },
  //   [dispatch]
  // );

  const combineProps = { storedMediaData, globalStateImageData };

  return <ImagePanel {...combineProps} />;
};
