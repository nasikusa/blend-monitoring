import { useSelector } from 'react-redux';

import { AppState } from '../../stores/index';
import useSceneCollection from './useSceneCollection';
import { GlCollectionType } from '../../stores/collection/collectionData';

/**
 * @todo asを使用しているため注意。 はやめに対策したいです。
 */
const useCurrentSceneCollection = (): GlCollectionType[] => {
  const currentSceneCollection = useSelector(
    (state: AppState) => state.currentSceneCollection
  );
  const resultObject = useSceneCollection(
    currentSceneCollection
  ) as GlCollectionType[];
  return resultObject;
};

export default useCurrentSceneCollection;
