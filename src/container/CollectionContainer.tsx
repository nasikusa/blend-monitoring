import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Collection from '../components/molecules/Collection';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

import { deleteSingleCollection as deleteSingleCollectionAction } from '../types/collection/collectionData';
import { AppState } from '../stores';

type Props = {
  collectionId: string;
};

const CollectionContainer = (props: Props) => {
  const { collectionId } = props;
  const rawCollectionData = useSelector(
    (state: AppState) => state.collection[collectionId]
  );
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
    rawCollectionData,
    // updateVisibility,
  };

  return <Collection {...combineProps} />;
};

export default CollectionContainer;
