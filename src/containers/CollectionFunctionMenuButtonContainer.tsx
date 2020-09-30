import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import CollectionFunctionMenuButton from 'components/atoms/CollectionFunctionMenuButton';
/* eslint-enable import/no-unresolved */

const CollectionFunctionMenuButtonContainer = (props: any) => {
  const globalTooltopEnterDelayTime = useSelector(
    (state: AppState) => state.glSettings.tooltipEnterDelayTime,
    shallowEqual
  );

  const combineProps = { ...props, globalTooltopEnterDelayTime };

  return <CollectionFunctionMenuButton {...combineProps} />;
};

export default CollectionFunctionMenuButtonContainer;
