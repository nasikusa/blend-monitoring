import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { useCollectionValueBlendMode } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import useRawCollection from 'hooks/collection/useRawCollection';
import { deleteCollectionInnerItem } from 'stores/collection/collection';
import { AppState } from 'stores/index';
import {
  updateValueValue as updateCollectionValueBlendModeValue,
  UpdateValueValuePayloadType,
} from 'stores/collection/collectionValueBlendMode';
import BlendModalContents from 'components/molecules/BlendModalContents';
import useAddCollectionInnerItemWithValue from 'hooks/collection/useAddCollectionInnerItemWithValue';
/* eslint-enable import/no-unresolved */

type Props = {
  blendModalMode: 'single' | 'multi';
};

const BlendModalContentsContainer: React.FC<Props> = (props) => {
  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);

  const rawCollectionData = useRawCollection();

  const collectionIdContextValue = useCollectionIdContext();

  const storedBlendModeValue = useCollectionValueBlendMode(
    collectionIdContextValue.collectionId
  );

  const storeAddCollectionInnerItemWithValue = useAddCollectionInnerItemWithValue();

  const dispatch = useDispatch();

  const storeUpdateCollectionValueBlendModeValue = useCallback(
    (payload: UpdateValueValuePayloadType) => {
      dispatch(updateCollectionValueBlendModeValue(payload));
    },
    [dispatch]
  );

  const storeDeleteCollectionInnerItem = useCallback(
    (payload) => {
      dispatch(deleteCollectionInnerItem(payload));
    },
    [dispatch]
  );

  const combineProps = {
    storeUpdateCollectionValueBlendModeValue,
    storeDeleteCollectionInnerItem,
    storeAddCollectionInnerItemWithValue,
    blendModeOrder,
    storedBlendModeValue,
    rawCollectionData,
    ...props,
  };

  return <BlendModalContents {...combineProps} />;
};

export default BlendModalContentsContainer;
