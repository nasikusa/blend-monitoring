import React from 'react';
import { useDispatch } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { useCollectionValueOpacity } from 'hooks/collection/useCollectionValue';
import useCollectionIdContext from 'hooks/context/useCollectionIdContext';
import OpacitySlider from 'components/molecules/OpacitySlider';
import {
  updateValue,
  UpdateValuePayloadType,
} from 'stores/collection/collectionValueOpacity';
/* eslint-enable import/no-unresolved */

export type Props = {
  isShowInputArea?: boolean;
  isShowBeforeIcon?: boolean;
  sliderStopCheckTime?: number;
  sliderMaxWidth?: number;
};

const CustomSliderContainer: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const collectionIdContextValue = useCollectionIdContext();

  const storedOpacityValue = useCollectionValueOpacity(
    collectionIdContextValue.collectionId
  );

  const storeUpdateOpacityValue = React.useCallback(
    (payload: UpdateValuePayloadType) => {
      dispatch(updateValue(payload));
    },
    [dispatch]
  );

  return (
    <OpacitySlider
      storeUpdateOpacityValue={storeUpdateOpacityValue}
      storedOpacityValue={storedOpacityValue}
      {...props}
    />
  );
};

CustomSliderContainer.defaultProps = {
  isShowInputArea: true,
  isShowBeforeIcon: false,
  sliderStopCheckTime: 200,
};

export default CustomSliderContainer;
