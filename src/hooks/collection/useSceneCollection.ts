import { useSelector, shallowEqual } from 'react-redux';

import { AppState } from '../../stores/index';
import { denormalizeSceneCollection } from '../../utils/denormalize';
import { IdType } from '../../types/collection/collectionData';

const useSceneCollection = (
  argumentSceneCollectionId: IdType
): ReturnType<typeof denormalizeSceneCollection> => {
  const sceneCollection = useSelector(
    (state: AppState) => state.sceneCollection,
    shallowEqual
  );
  const collection = useSelector(
    (state: AppState) => state.collection,
    shallowEqual
  );
  const collectionItem = useSelector(
    (state: AppState) => state.collectionItem,
    shallowEqual
  );
  const collectionValueOpacity = useSelector(
    (state: AppState) => state.collectionValueOpacity,
    shallowEqual
  );
  const collectionValueBlendMode = useSelector(
    (state: AppState) => state.collectionValueBlendMode,
    shallowEqual
  );
  const collectionValueColor = useSelector(
    (state: AppState) => state.collectionValueColor,
    shallowEqual
  );
  const collectionValueVisibility = useSelector(
    (state: AppState) => state.collectionValueVisibility,
    shallowEqual
  );
  const collectionValueImage = useSelector(
    (state: AppState) => state.collectionValueImage,
    shallowEqual
  );

  const resultObject = denormalizeSceneCollection(argumentSceneCollectionId, {
    sceneCollection,
    collection,
    collectionItem,
    collectionValueBlendMode,
    collectionValueOpacity,
    collectionValueVisibility,
    collectionValueColor,
    collectionValueImage,
  });
  return resultObject;
};

export default useSceneCollection;
