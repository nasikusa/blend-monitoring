import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import ColorPanel from '../components/molecules/ColorPanel';
import { AppState } from '../stores/index';
import {
  stockAddColor as stockAddColorAction,
  stockRemoveColor as stockRemoveColorAction,
} from '../stores/color/stockedColors';
import {
  CollectionCategoryType,
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} from '../stores/collection/collection';
import {
  updateValueValue,
  addValue as addCollectionValueColor,
  collectionValueColorType,
  UpdateValuePayloadType,
} from '../stores/collection/collectionValueColor';
import { IdType } from '../types/collection/collectionData';
import { addItem as addCollectionItem } from '../stores/collection/collectionItem';

type Props = {
  rawCollectionData: CollectionCategoryType;
};

export default (props: Props) => {
  const { rawCollectionData } = props;

  const innerItemIdData = rawCollectionData.innerItemId;

  const stockedColorData = useSelector(
    (state: AppState) => state.stockedColors,
    shallowEqual
  );
  const dispatch = useDispatch();

  /**
   * 対象となるカラーパラメータのID
   */
  const targetColorValueId: IdType | IdType[] = useSelector(
    (state: AppState) => {
      if (
        rawCollectionData.type === 'multiColors' ||
        rawCollectionData.type === 'singleColor' ||
        rawCollectionData.type === 'singleColorMultiBlends'
      ) {
        if (Array.isArray(innerItemIdData)) {
          return innerItemIdData.map((singleInnerItemIdData) => {
            // 上にてcollectionのタイプを確定させているため、 asでキャストしている。
            // @todo: asを取り除きたい
            return state.collectionItem[singleInnerItemIdData].color as IdType;
          });
        }
        // 上にてcollectionのタイプを確定させているため、 asでキャストしている。
        // @todo: asを取り除きたい
        return state.collectionItem[innerItemIdData].color as IdType;
      }
      return [];
    },
    shallowEqual
  );

  /**
   * 対象となるカラーvalueオブジェクト
   */
  const storedColorValue:
    | collectionValueColorType
    | collectionValueColorType[] = useSelector((state: AppState) => {
    if (Array.isArray(targetColorValueId)) {
      return targetColorValueId.map((singleTargetColorValueId) => {
        return state.collectionValueColor[singleTargetColorValueId];
      });
    }
    return state.collectionValueColor[targetColorValueId];
  }, shallowEqual);

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
