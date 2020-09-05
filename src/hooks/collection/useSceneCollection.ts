import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import { denormalizeSceneCollection } from '../../utils/denormalize';
import { IdType } from '../../stores/collectionData';

const useSceneCollection = (
  argumentSceneCollectionId: IdType
): ReturnType<typeof denormalizeSceneCollection> => {
  const sceneCollection = useSelector(
    (state: AppState) => state.sceneCollection
  );
  const collection = useSelector((state: AppState) => state.collection);
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
