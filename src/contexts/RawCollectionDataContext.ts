import { createContext } from 'react';
import { NIL as NIL_UUID } from 'uuid';
/* eslint-disable import/no-unresolved */
import { CollectionCategoryType } from 'stores/collection/collection';
/* eslint-enable import/no-unresolved */

/**
 * collectionデータ用のコンテクスト
 * @todo デフォルトを null かもしくは、サンプルデータにしたい
 */
export const RawCollectionDataContext = createContext<CollectionCategoryType>({
  id: NIL_UUID,
  type: 'singleColor',
  roughType: 'color',
  innerItemId: NIL_UUID,
  defaultOpacityId: NIL_UUID,
  defaultBlendModeId: NIL_UUID,
  defaultVisibilityId: NIL_UUID,
  defaultColorId: NIL_UUID,
});

export default RawCollectionDataContext;
