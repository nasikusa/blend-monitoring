import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { deleteCollectionInnerItem } from 'stores/collection/collection';
import { AppState } from 'stores/index';
import BlendModePanel from 'components/molecules/BlendModePanel';
import { useCollectionValueBlendMode } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
/* eslint-enable import/no-unresolved */

const BlendModePanelContainer = () => {
  const collectionIdContextValue = useCollectionIdContext();

  const storedBlendModeValue = useCollectionValueBlendMode(
    collectionIdContextValue.collectionId
  );

  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);

  const dispatch = useDispatch();

  const storeDeleteBlendModeValue = useCallback(
    (payload) => {
      dispatch(deleteCollectionInnerItem(payload));
    },
    [dispatch]
  );

  const combineProps = {
    storeDeleteBlendModeValue,
    blendModeOrder,
    storedBlendModeValue,
  };

  return <BlendModePanel {...combineProps} />;
};

export default BlendModePanelContainer;
