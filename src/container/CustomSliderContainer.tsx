import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import OpacitySlider from '../components/molecules/OpacitySlider';

import {
  updateValue,
  collectionValueOpacityType,
  UpdateValuePayloadType,
} from '../stores/collection/collectionValueOpacity';
import { CollectionCategoryType } from '../stores/collection/collection';
import { AppState } from '../stores';
import { IdType } from '../types/collection/collectionData';

export type Props = {
  rawCollectionData: CollectionCategoryType;
  isShowInputArea?: boolean;
  isShowBeforeIcon?: boolean;
  sliderStopCheckTime?: number;
  sliderMaxWidth?: number;
};

const CustomSliderContainer: React.FC<Props> = (props: Props) => {
  const { rawCollectionData } = props;
  const dispatch = useDispatch();

  const innerItemIdData = rawCollectionData.innerItemId;

  /**
   * 対象となる透過度パラメータのID
   */
  const targetOpacityValueId: IdType | IdType[] = useSelector(
    (state: AppState) => {
      if (Array.isArray(innerItemIdData)) {
        return innerItemIdData.map((singleInnerItemIdData) => {
          return state.collectionItem[singleInnerItemIdData].opacity;
        });
      }
      return state.collectionItem[innerItemIdData].opacity;
    },
    shallowEqual
  );

  /**
   * 対象となる透過度valueオブジェクト
   */
  const storedOpacityValue:
    | collectionValueOpacityType
    | collectionValueOpacityType[] = useSelector((state: AppState) => {
    if (Array.isArray(targetOpacityValueId)) {
      return targetOpacityValueId.map((singleTargetOpacityValueId) => {
        return state.collectionValueOpacity[singleTargetOpacityValueId];
      });
    }
    return state.collectionValueOpacity[targetOpacityValueId];
  }, shallowEqual);

  const storeUpdateOpacityValue = React.useCallback(
    (payload: UpdateValuePayloadType) => {
      dispatch(updateValue(payload));
    },
    [dispatch]
  );

  const combineProps = {
    storeUpdateOpacityValue,
    storedOpacityValue,
    isArrayAllSameId: Array.isArray(storedOpacityValue)
      ? storedOpacityValue.every(
          (singleStoredOpacityValue) => singleStoredOpacityValue.id
        )
      : null,
    ...props,
  };

  return <OpacitySlider {...combineProps} />;
};

CustomSliderContainer.defaultProps = {
  isShowInputArea: true,
  isShowBeforeIcon: false,
  sliderStopCheckTime: 200,
};

const CustomSliderContainerMemo = React.memo<Props>(
  (CustomSliderContainerMemoProps) => {
    return (
      <CustomSliderContainer
        rawCollectionData={CustomSliderContainerMemoProps.rawCollectionData}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.rawCollectionData.innerItemId ===
    nextProps.rawCollectionData.innerItemId
);

export default CustomSliderContainerMemo;
