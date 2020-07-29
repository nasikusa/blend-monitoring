import React from 'react';
import { useSelector } from 'react-redux';

import GlView from '../components/atoms/GlView';

export default (props: any) => {
  // @ts-ignore
  const allLayerData = useSelector((state) => state.glAllLayerData);
  // @ts-ignore
  const glSettings = useSelector((state) => state.glSettings);

  const combineProps = { allLayerData, glSettings, ...props };

  return <GlView {...combineProps} />;
};
