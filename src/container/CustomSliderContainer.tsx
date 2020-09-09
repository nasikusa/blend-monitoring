import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpacitySlider from '../components/molecules/OpacitySlider';

import { updateValue } from '../stores/collection/collectionValueOpacity';
import { CollectionCategoryType } from '../stores/collection/collection';
import { AppState } from '../stores';

type Props = {
  rawCollectionData: CollectionCategoryType;
  isShowInputArea?: boolean;
  isShowBeforeIcon?: boolean;
  sliderStopCheckTime?: number | null;
  sliderMaxWidth?: number;
};

const CustomSliderContianer: React.FC<Props> = (props: Props) => {
  const { rawCollectionData } = props;
  const dispatch = useDispatch();

  const innerItemIdData = rawCollectionData.innerItemID;

  const targetOpacityValueId = useSelector((state: AppState) => {
    if (Array.isArray(innerItemIdData)) {
      return innerItemIdData.map((singleInnerItemIdData) => {
        return state.collectionItem[singleInnerItemIdData].opacity;
      });
    }
    return state.collectionItem[innerItemIdData].opacity;
  });

  const storedOpacityValue = useSelector((state: AppState) => {
    if (Array.isArray(targetOpacityValueId)) {
      return targetOpacityValueId.map((singleTargetOpacityValueId) => {
        return state.collectionValueOpacity[singleTargetOpacityValueId];
      });
    }
    return state.collectionValueOpacity[targetOpacityValueId];
  });

  const storeUpdateOpacityValue = React.useCallback(
    (payload) => {
      dispatch(updateValue(payload));
    },
    [dispatch]
  );

  const combineProps = {
    targetOpacityValueId,
    storeUpdateOpacityValue,
    storedOpacityValue,
    isArrayStoredData: Array.isArray(storedOpacityValue),
    isArrayAllSameId: Array.isArray(storedOpacityValue)
      ? storedOpacityValue.every(
          (singleStoredOpacityValue) => singleStoredOpacityValue.id
        )
      : null,
    ...props,
  };

  return <OpacitySlider {...combineProps} />;
};

CustomSliderContianer.defaultProps = {
  isShowInputArea: true,
  isShowBeforeIcon: true,
  sliderStopCheckTime: 300,
};

export default CustomSliderContianer;
