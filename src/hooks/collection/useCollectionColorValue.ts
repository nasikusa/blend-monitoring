import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { getDenormalizedColorValue } from '../../utils/denormalize';
import { IdType } from '../../stores/collection/collectionData';

const useCollectionColorValue = (
  argumentCollectionItemId: IdType
): ReturnType<typeof getDenormalizedColorValue> => {
  const collectionValueColor = useSelector(
    (state: AppState) => state.collectionValueColor
  );

  const resultObject = getDenormalizedColorValue(
    argumentCollectionItemId,
    collectionValueColor
  );
  return resultObject;
};

export default useCollectionColorValue;
