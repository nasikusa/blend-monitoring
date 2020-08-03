import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Collection from '../components/molecules/Collection';

import { AppState } from '../stores/index';
import {
  deleteSingleCollection as deleteSingleCollectionAction,
  updateVisibility as updateVisibilityAction,
} from '../stores/collectionData';

export default () => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
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
  const updateVisibility = useCallback(
    (value) => {
      dispatch(updateVisibilityAction(value));
    },
    [dispatch]
  );

  const combineProps = {
    collectionData,
    deleteSingleCollection,
    updateVisibility,
  };

  return <Collection {...combineProps} />;
};
