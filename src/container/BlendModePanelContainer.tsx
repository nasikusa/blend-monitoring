import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  IdType,
  // GlCollectionTypeArray,
} from '../types/collection/collectionData';
import {
  CollectionCategoryType,
  deleteCollectionInnerItem,
} from '../stores/collection/collection';
import { collectionValueBlendModeType } from '../stores/collection/collectionValueBlendMode';
import { AppState } from '../stores/index';
import BlendModePanel from '../components/molecules/BlendModePanel';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

type Props = {
  rawCollectionData: CollectionCategoryType;
};

export default (props: Props) => {
  const { rawCollectionData } = props;
  const collectionData = useCurrentSceneCollection();

  const innerItemIdData = rawCollectionData.innerItemID;

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
    }
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
  });

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
    collectionData,
    targetBlendModeValueId,
    storedBlendModeValue,
    rawCollectionData,
  };

  return <BlendModePanel {...combineProps} />;
};
