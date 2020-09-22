import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ImagePanel from '../components/molecules/ImagePanel';
import { AppState } from '../stores/index';
import { IdType } from '../types/collection/collectionData';
import { GlCollectionOrderContext } from '../components/molecules/CollectionList/CollectionList';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';
import { CollectionCategoryType } from '../stores/collection/collection';
import { collectionValueImageType } from '../stores/collection/collectionValueImage';

type Props = {
  rawCollectionData: CollectionCategoryType;
};

const ImagePanelContainer = (props: Props) => {
  const { rawCollectionData } = props;

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

  // ==========================================

  const storedMediaData = useSelector((state: AppState) => state.storedMedia);
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const currentSingleCollectionData = collectionData[glCollectionOrderKey];
  let globalStateImageData =
    currentSingleCollectionData.roughType === 'image'
      ? currentSingleCollectionData.image
      : null;
  if (!Array.isArray(globalStateImageData) && globalStateImageData != null) {
    globalStateImageData = [globalStateImageData];
  }
  if (globalStateImageData == null) {
    globalStateImageData = [];
  }

  const combineProps = {
    storedImageValue,
    storedMediaData,
    globalStateImageData,
  };

  return <ImagePanel {...combineProps} />;
};

export default ImagePanelContainer;
