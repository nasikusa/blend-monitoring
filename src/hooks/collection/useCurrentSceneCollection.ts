import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import useSceneCollection from './useSceneCollection';
import { GlCollectionType } from '../../types/collection/collectionData';

const useCurrentSceneCollection = (): GlCollectionType[] => {
  const currentSceneCollection = useSelector(
    (state: AppState) => state.currentSceneCollection
  );
  const resultObject = useSceneCollection(currentSceneCollection.currentId);
  return resultObject;
};

export default useCurrentSceneCollection;
