import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { AppState } from 'stores';
import { deleteSceneCollectionInnerItem } from 'stores/collection/sceneCollection';
import Collection from 'components/molecules/Collection';
/* eslint-enable import/no-unresolved */

type Props = {
  collectionId: string;
  collectionOrder: number;
};

const CollectionContainer: React.FC<Props> = (props) => {
  const { collectionId } = props;
  const rawCollectionData = useSelector(
    (state: AppState) => state.collection[collectionId],
    shallowEqual
  );
  const currentSceneCollectionData = useSelector(
    (state: AppState) => state.currentSceneCollection,
    shallowEqual
  );

  const dispatch = useDispatch();

  const storeDeleteSceneCollectionInnerItem = useCallback(
    (payload) => {
      dispatch(deleteSceneCollectionInnerItem(payload));
    },
    [dispatch]
  );

  /**
   * 単一のコレクションのvisibilityを更新する関数
   */
  // const updateVisibility = useCallback(
  //   (value) => {
  //     dispatch(updateVisibilityAction(value));
  //   },
  //   [dispatch]
  // );

  const combineProps = {
    storeDeleteSceneCollectionInnerItem,
    currentSceneCollectionData,
    rawCollectionData,
    ...props,
    // updateVisibility,
  };

  return <Collection {...combineProps} />;
};

export default memo(
  CollectionContainer,
  (prevProps, nextProps) => prevProps.collectionId === nextProps.collectionId
);
