import React from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import CollectionFunctionMenuButton from 'components/atoms/CollectionFunctionMenuButton';
/* eslint-enable import/no-unresolved */

export default (props: any) => {
  const appSettings = useSelector((state: AppState) => state.glSettings);
  const globalTooltopEnterDelayTime = appSettings.tooltipEnterDelayTime;

  const combineProps = { ...props, globalTooltopEnterDelayTime };

  return <CollectionFunctionMenuButton {...combineProps} />;
};
