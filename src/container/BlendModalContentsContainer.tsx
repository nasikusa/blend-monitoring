import React, { useContext } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import BlendModalContents from '../components/molecules/BlendModalContents';

import { IdType } from '../types/collection/collectionData';
import { AppState } from '../stores/index';
import { RawCollectionDataContext } from '../components/molecules/Collection/Collection';
import {
  collectionValueBlendModeType,
  updateValueValue as updateCollectionValueBlendModeValue,
  addValue as addCollectionValueBlendMode,
} from '../stores/collection/collectionValueBlendMode';
import { addItem as addCollectionItem } from '../stores/collection/collectionItem';
import {
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} from '../stores/collection/collection';

type Props = {
  blendModalMode: 'single' | 'multi';
  canDisplayNormalBlend: boolean;
  canDisplayLighterBlend: boolean;
  canDisplayLighterAndDarkerBlend: boolean;
  canDisplayDarkerBlend: boolean;
  canDisplayMathBlend: boolean;
};

export default (props: Props) => {
  const blendModeOrder = useSelector((state: AppState) => state.blendModeOrder);

  const rawCollectionData = useContext(RawCollectionDataContext);

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

  const dispatch = useDispatch();

  const storeUpdateCollectionValueBlendModeValue = React.useCallback(
    (payload) => {
      dispatch(updateCollectionValueBlendModeValue(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueBlendMode = React.useCallback(
    (payload) => {
      dispatch(addCollectionValueBlendMode(payload));
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
