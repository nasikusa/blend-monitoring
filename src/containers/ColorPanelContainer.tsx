import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { useCollectionValueColor } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import useRawCollection from 'hooks/collection/useRawCollection';
import { AppState } from 'stores/index';
import {
  stockAddColor as stockAddColorAction,
  stockRemoveColor as stockRemoveColorAction,
} from 'stores/color/stockedColors';
import {
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} from 'stores/collection/collection';
import {
  updateValueValue,
  addValue as addCollectionValueColor,
  UpdateValuePayloadType,
} from 'stores/collection/collectionValueColor';
import { addItem as addCollectionItem } from 'stores/collection/collectionItem';
import ColorPanel from 'components/molecules/ColorPanel';
/* eslint-enable import/no-unresolved */

export default () => {
  const rawCollectionData = useRawCollection();

  const stockedColorData = useSelector(
    (state: AppState) => state.stockedColors,
    shallowEqual
  );
  const dispatch = useDispatch();

  const collectionIdContextValue = useCollectionIdContext();

  const storedColorValue = useCollectionValueColor(
    collectionIdContextValue.collectionId
  );

  /**
   * collectionValueColorのvalueを更新する
   */
  const storeUpdateCollectionValueColorValue = React.useCallback(
    (payload: UpdateValuePayloadType) => {
      dispatch(updateValueValue(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueColor = React.useCallback(
    (payload) => {
      dispatch(addCollectionValueColor(payload));
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

  const stockAddColor = React.useCallback(
    (payload) => {
      dispatch(stockAddColorAction(payload));
    },
    [dispatch]
  );
  const stockRemoveColor = React.useCallback(() => {
    dispatch(stockRemoveColorAction());
  }, [dispatch]);

  const combineProps = {
    rawCollectionData,
    storedColorValue,
    stockedColorData,
    storeUpdateCollectionValueColorValue,
    storeAddCollectionValueColor,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
    storeDeleteCollectionInnerItem,
    stockAddColor,
    stockRemoveColor,
  };

  return <ColorPanel {...combineProps} />;
};
