import React from 'react';
import { useSelector } from 'react-redux';

import GlView from '../components/atoms/GlView';
import { AppState } from '../stores/index';

/**
 * glViewコンポーネントのcontainerコンポーネント
 */
export default () => {
  const glSettings = useSelector((state: AppState) => state.glSettings);
  const multiCollectionData = useSelector(
    (state: AppState) => state.collectionData
  );
  const storedMediaState = useSelector((state: AppState) => state.storedMedia);

  const combineProps = {
    multiCollectionData,
    glSettings,
    storedMediaState,
  };

  return <GlView {...combineProps} />;
};
