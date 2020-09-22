import React, { useContext } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import MediaModalContents from '../components/molecules/MediaModalContents';
import { AppState } from '../stores/index';
import { IdType } from '../types/collection/collectionData';
import { RawCollectionDataContext } from '../components/molecules/Collection/Collection';
import {
  collectionValueImageType,
  updateValueValue,
  addValue as addCollectionValueImage,
} from '../stores/collection/collectionValueImage';
import { addItem as addCollectionItem } from '../stores/collection/collectionItem';
import {
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} from '../stores/collection/collection';

export default (props: any) => {
  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );

  const rawCollectionData = useContext(RawCollectionDataContext);

  const innerItemIdData = rawCollectionData.innerItemId;

  /**
   * 対象となる描画モードパラメータのID
   */
  const targetImageValueId: IdType | IdType[] = useSelector(
    (state: AppState) => {
      if (Array.isArray(innerItemIdData)) {
        return innerItemIdData.map((singleInnerItemIdData) => {
          return state.collectionItem[singleInnerItemIdData].image as IdType;
        });
      }
      return state.collectionItem[innerItemIdData].image as IdType;
    },
    shallowEqual
  );

  /**
   * 対象となる描画モードvalueオブジェクト
   */
  const storedImageValue:
    | collectionValueImageType
    | collectionValueImageType[] = useSelector((state: AppState) => {
    if (Array.isArray(targetImageValueId)) {
      return targetImageValueId.map((singleTargetBlendModeValueId) => {
        return state.collectionValueImage[singleTargetBlendModeValueId];
      });
    }
    return state.collectionValueImage[targetImageValueId];
  }, shallowEqual);

  const dispatch = useDispatch();

  const storeCollectionValueImageUpdateValue = React.useCallback(
    (payload) => {
      dispatch(updateValueValue(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueImage = React.useCallback(
    (payload) => {
      dispatch(addCollectionValueImage(payload));
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
    rawCollectionData,
    storedMediaData,
    storedImageValue,
    storeCollectionValueImageUpdateValue,
    storeAddCollectionValueImage,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
    storeDeleteCollectionInnerItem,
    ...props,
  };

  return <MediaModalContents {...combineProps} />;
};
