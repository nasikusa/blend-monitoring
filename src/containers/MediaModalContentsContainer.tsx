import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { useCollectionValueImage } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import useRawCollection from 'hooks/collection/useRawCollection';
import { AppState } from 'stores/index';
import { updateValueValue } from 'stores/collection/collectionValueImage';
import { deleteCollectionInnerItem } from 'stores/collection/collection';
import useAddCollectionInnerItemWithValue from 'hooks/collection/useAddCollectionInnerItemWithValue';
/* eslint-enable import/no-unresolved */
import MediaModalContents from '../components/molecules/MediaModalContents';

const MediaModalContentsContainer = (props: any) => {
  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );

  const rawCollectionData = useRawCollection();

  const collectionIdContextValue = useCollectionIdContext();

  const storedImageValue = useCollectionValueImage(
    collectionIdContextValue.collectionId
  );

  const storeAddCollectionInnerItemWithValue = useAddCollectionInnerItemWithValue();

  const dispatch = useDispatch();

  const storeCollectionValueImageUpdateValue = React.useCallback(
    (payload) => {
      dispatch(updateValueValue(payload));
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
    storeDeleteCollectionInnerItem,
    storeAddCollectionInnerItemWithValue,
    ...props,
  };

  return <MediaModalContents {...combineProps} />;
};

export default MediaModalContentsContainer;
