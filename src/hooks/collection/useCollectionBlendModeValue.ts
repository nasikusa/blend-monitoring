import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { getDenormalizedBlendModeValue } from '../../utils/denormalize';
import { IdType } from '../../stores/collectionData';

const useCollectionBlendModeValue = (
  argumentCollectionItemId: IdType
): ReturnType<typeof getDenormalizedBlendModeValue> => {
  const collectionValueBlendMode = useSelector(
    (state: AppState) => state.collectionValueBlendMode
  );

  const resultObject = getDenormalizedBlendModeValue(
    argumentCollectionItemId,
    collectionValueBlendMode
  );
  return resultObject;
};

export default useCollectionBlendModeValue;
