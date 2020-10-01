import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import CollectionFunctionMenuButton from 'components/atoms/CollectionFunctionMenuButton';
/* eslint-enable import/no-unresolved */

const CollectionFunctionMenuButtonContainer: React.FC<any> = (props) => {
  const globalTooltopEnterDelayTime = useSelector(
    (state: AppState) => state.glSettings.tooltipEnterDelayTime,
    shallowEqual
  );

  const combineProps = { ...props, globalTooltopEnterDelayTime };

  return <CollectionFunctionMenuButton {...combineProps} />;
};

export default CollectionFunctionMenuButtonContainer;
