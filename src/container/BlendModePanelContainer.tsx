import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { IdType } from '../types/collection/collectionData';
import {
  CollectionCategoryType,
  deleteCollectionInnerItem,
} from '../stores/collection/collection';
import { collectionValueBlendModeType } from '../stores/collection/collectionValueBlendMode';
import { AppState } from '../stores/index';
import BlendModePanel from '../components/molecules/BlendModePanel';

type Props = {
  rawCollectionData: CollectionCategoryType;
};

export default (props: Props) => {
  const { rawCollectionData } = props;

  const innerItemIdData = rawCollectionData.innerItemId;

  /**
   * 対象となる描画モードパラメータのID
   */
  const targetBlendModeValueId: IdType | IdType[] = useSelector(
    (state: AppState) => {
      if (Array.isArray(innerItemIdData)) {
        return innerItemIdData.map((singleInnerItemIdData) => {
          return state.collectionItem[singleInnerItemIdData].blendMode;
        });
      }
      return state.collectionItem[innerItemIdData].blendMode;
    },
    shallowEqual
  );

  /**
   * 対象となる描画モードvalueオブジェクト
   */
  const storedBlendModeValue:
    | collectionValueBlendModeType
    | collectionValueBlendModeType[] = useSelector((state: AppState) => {
    if (Array.isArray(targetBlendModeValueId)) {
      return targetBlendModeValueId.map((singleTargetBlendModeValueId) => {
        return state.collectionValueBlendMode[singleTargetBlendModeValueId];
      });
    }
    return state.collectionValueBlendMode[targetBlendModeValueId];
  }, shallowEqual);

  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);
  const dispatch = useDispatch();

  const storeDeleteBlendModeValue = React.useCallback(
    (payload) => {
      dispatch(deleteCollectionInnerItem(payload));
    },
    [dispatch]
  );

  const combineProps = {
    storeDeleteBlendModeValue,
    blendModeOrder,
    targetBlendModeValueId,
    storedBlendModeValue,
    ...props,
  };

  return <BlendModePanel {...combineProps} />;
};
