import React from 'react';
import { useSelector } from 'react-redux';
import CollectionFunctionMenuButton from '../components/atoms/CollectionFunctionMenuButton';
import { AppState } from '../stores/index';

export default (props: any) => {
  const appSettings = useSelector((state: AppState) => state.glSettings);
  const globalTooltopEnterDelayTime = appSettings.tooltipEnterDelayTime;

  const combineProps = { ...props, globalTooltopEnterDelayTime };

  return <CollectionFunctionMenuButton {...combineProps} />;
};
