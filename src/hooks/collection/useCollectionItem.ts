import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { getDenormalizedCollectionItem } from '../../utils/denormalize';
import { IdType } from '../../stores/collectionData';

const useCollectionItem = (
  argumentCollectionItemId: IdType
): ReturnType<typeof getDenormalizedCollectionItem> => {
  const collectionItem = useSelector((state: AppState) => state.collectionItem);
  const collectionValueOpacity = useSelector(
    (state: AppState) => state.collectionValueOpacity
  );
  const collectionValueBlendMode = useSelector(
    (state: AppState) => state.collectionValueBlendMode
  );
  const collectionValueColor = useSelector(
    (state: AppState) => state.collectionValueColor
  );
  const collectionValueVisibility = useSelector(
    (state: AppState) => state.collectionValueVisibility
  );
  const collectionValueImage = useSelector(
    (state: AppState) => state.collectionValueImage
  );

  const resultObject = getDenormalizedCollectionItem(argumentCollectionItemId, {
    collectionItem,
    collectionValueBlendMode,
    collectionValueOpacity,
    collectionValueVisibility,
    collectionValueColor,
    collectionValueImage,
  });
  return resultObject;
};

export default useCollectionItem;
