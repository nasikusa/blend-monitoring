import React from 'react';
import { useSelector } from 'react-redux';

import GlView from '../components/atoms/GlView';

export type Props = {
  itemKey: number;
};

export default (props: Props) => {
  // @ts-ignore
  const glSettings = useSelector((state) => state.glSettings);
  // @ts-ignore
  const multiCollectionData = useSelector((state) => state.collectionData);

  const combineProps = {
    multiCollectionData,
    glSettings,
    ...props,
  };

  return <GlView {...combineProps} />;
};
