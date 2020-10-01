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
import { deleteCollectionInnerItem } from 'stores/collection/collection';
import {
  updateValueValue,
  UpdateValuePayloadType,
} from 'stores/collection/collectionValueColor';
import ColorPanel from 'components/molecules/ColorPanel';
import useAddCollectionInnerItemWithValue from 'hooks/collection/useAddCollectionInnerItemWithValue';
/* eslint-enable import/no-unresolved */

const ColorPanelContainer: React.FC = () => {
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

  const storeAddCollectionInnerItemWithValue = useAddCollectionInnerItemWithValue();

  /**
   * collectionValueColorのvalueを更新する
   */
  const storeUpdateCollectionValueColorValue = React.useCallback(
    (payload: UpdateValuePayloadType) => {
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
    storeDeleteCollectionInnerItem,
    storeAddCollectionInnerItemWithValue,
    stockAddColor,
    stockRemoveColor,
  };

  return <ColorPanel {...combineProps} />;
};

export default ColorPanelContainer;
