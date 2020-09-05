import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { getDenormalizedVisibilityValue } from '../../utils/denormalize';
import { IdType } from '../../stores/collectionData';

const useCollectionVisibilityValue = (
  argumentCollectionItemId: IdType
): ReturnType<typeof getDenormalizedVisibilityValue> => {
  const collectionValueVisibility = useSelector(
    (state: AppState) => state.collectionValueVisibility
  );

  const resultObject = getDenormalizedVisibilityValue(
    argumentCollectionItemId,
    collectionValueVisibility
  );
  return resultObject;
};

export default useCollectionVisibilityValue;
