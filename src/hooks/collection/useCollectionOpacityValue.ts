import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { getDenormalizedOpacityValue } from '../../utils/denormalize';
import { IdType } from '../../stores/collectionData';

const useCollectionOpacityValue = (
  argumentCollectionItemId: IdType
): ReturnType<typeof getDenormalizedOpacityValue> => {
  const collectionValueOpacity = useSelector(
    (state: AppState) => state.collectionValueOpacity
  );

  const resultObject = getDenormalizedOpacityValue(
    argumentCollectionItemId,
    collectionValueOpacity
  );
  return resultObject;
};

export default useCollectionOpacityValue;
