import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { useCollectionValueBlendMode } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import {
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} from 'stores/collection/collection';
import { AppState } from 'stores/index';
import {
  updateValueValue as updateCollectionValueBlendModeValue,
  addValue as addCollectionValueBlendMode,
} from 'stores/collection/collectionValueBlendMode';
import { addItem as addCollectionItem } from 'stores/collection/collectionItem';
import BlendModalContents from 'components/molecules/BlendModalContents';
import useRawCollection from 'hooks/collection/useRawCollection';
/* eslint-enable import/no-unresolved */

type Props = {
  blendModalMode: 'single' | 'multi';
  canDisplayNormalBlend: boolean;
  canDisplayLighterBlend: boolean;
  canDisplayLighterAndDarkerBlend: boolean;
  canDisplayDarkerBlend: boolean;
  canDisplayMathBlend: boolean;
};

const BlendModalContentsContainer = (props: Props) => {
  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);

  const rawCollectionData = useRawCollection();

  const collectionIdContextValue = useCollectionIdContext();

  const storedBlendModeValue = useCollectionValueBlendMode(
    collectionIdContextValue.collectionId
  );

  const dispatch = useDispatch();

  const storeUpdateCollectionValueBlendModeValue = useCallback(
    (payload) => {
      dispatch(updateCollectionValueBlendModeValue(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueBlendMode = useCallback(
    (payload) => {
      dispatch(addCollectionValueBlendMode(payload));
    },
    [dispatch]
  );

  const storeAddCollectionItem = useCallback(
    (payload) => {
      dispatch(addCollectionItem(payload));
    },
    [dispatch]
  );

  const storeAddCollectionInnerItem = useCallback(
    (payload) => {
      dispatch(addCollectionInnerItem(payload));
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
    storeAddCollectionValueBlendMode,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
    storeDeleteCollectionInnerItem,
    blendModeOrder,
    storedBlendModeValue,
    rawCollectionData,
    ...props,
  };

  return <BlendModalContents {...combineProps} />;
};

export default BlendModalContentsContainer;
