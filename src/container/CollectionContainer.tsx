import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Collection from '../components/molecules/Collection';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

import { deleteSingleCollection as deleteSingleCollectionAction } from '../stores/collectionData';

export default () => {
  // const collectionData: GlCollectionTypeArray = useSelector<
  //   AppState,
  //   GlCollectionTypeArray
  // >((state) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const dispatch = useDispatch();

  /**
   * コレクションリストの単一のコレクションを削除する関数
   */
  const deleteSingleCollection = useCallback(
    (value) => {
      dispatch(deleteSingleCollectionAction(value));
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
    collectionData,
    deleteSingleCollection,
    // updateVisibility,
  };

  return <Collection {...combineProps} />;
};
