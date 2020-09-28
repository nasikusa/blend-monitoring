import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { useCollectionValueImage } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import useRawCollection from 'hooks/collection/useRawCollection';
import { AppState } from 'stores/index';
import {
  updateValueValue,
  addValue as addCollectionValueImage,
} from 'stores/collection/collectionValueImage';
import { addItem as addCollectionItem } from 'stores/collection/collectionItem';
import {
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} from 'stores/collection/collection';
/* eslint-enable import/no-unresolved */
import MediaModalContents from '../components/molecules/MediaModalContents';

export default (props: any) => {
  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );

  const rawCollectionData = useRawCollection();

  const collectionIdContextValue = useCollectionIdContext();

  const storedImageValue = useCollectionValueImage(
    collectionIdContextValue.collectionId
  );

  const dispatch = useDispatch();

  const storeCollectionValueImageUpdateValue = React.useCallback(
    (payload) => {
      dispatch(updateValueValue(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueImage = React.useCallback(
    (payload) => {
      dispatch(addCollectionValueImage(payload));
    },
    [dispatch]
  );

  const storeAddCollectionItem = React.useCallback(
    (payload) => {
      dispatch(addCollectionItem(payload));
    },
    [dispatch]
  );

  const storeAddCollectionInnerItem = React.useCallback(
    (payload) => {
      dispatch(addCollectionInnerItem(payload));
    },
    [dispatch]
  );
  const storeDeleteCollectionInnerItem = React.useCallback(
    (payload) => {
      dispatch(deleteCollectionInnerItem(payload));
    },
    [dispatch]
  );

  const combineProps = {
    rawCollectionData,
    storedMediaData,
    storedImageValue,
    storeCollectionValueImageUpdateValue,
    storeAddCollectionValueImage,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
    storeDeleteCollectionInnerItem,
    ...props,
  };

  return <MediaModalContents {...combineProps} />;
};
