import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { getDenormalizedImageValue } from '../../utils/denormalize';
import { IdType } from '../../stores/collection/collectionData';

const useCollectionImageValue = (
  argumentCollectionItemId: IdType
): ReturnType<typeof getDenormalizedImageValue> => {
  const collectionValueImage = useSelector(
    (state: AppState) => state.collectionValueImage
  );

  const resultObject = getDenormalizedImageValue(
    argumentCollectionItemId,
    collectionValueImage
  );
  return resultObject;
};

export default useCollectionImageValue;
