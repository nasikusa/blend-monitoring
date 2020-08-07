import React from 'react';
import { useSelector } from 'react-redux';

import GlView from '../components/atoms/GlView';
import { AppState } from '../stores/index';

export type Props = {
  itemKey: number;
};

/**
 * glViewコンポーネントのcontainerコンポーネント
 */
export default (props: Props) => {
  const glSettings = useSelector((state: AppState) => state.glSettings);
  const multiCollectionData = useSelector(
    (state: AppState) => state.collectionData
  );
  const storedMediaState = useSelector((state: AppState) => state.storedMedia);

  const combineProps = {
    multiCollectionData,
    glSettings,
    storedMediaState,
    ...props,
  };

  return <GlView {...combineProps} />;
};
