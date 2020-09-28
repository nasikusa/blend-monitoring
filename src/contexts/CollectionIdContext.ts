import { createContext } from 'react';
/* eslint-disable import/no-unresolved */
import { SceneCollectionsType } from 'stores/collection/sceneCollection';
import { ArrayElement } from 'types/utils/ArrayElement';
/* eslint-enable import/no-unresolved */

/**
 * 現在のコレクションの順番を決定するためのcontextの型
 */
export type GlCollectionOrderContextType = number;

const CollectionIdContext = createContext<{
  collectionId: ArrayElement<SceneCollectionsType>;
  collectionOrder: GlCollectionOrderContextType;
}>({
  collectionId: '',
  collectionOrder: -1,
});

export default CollectionIdContext;
