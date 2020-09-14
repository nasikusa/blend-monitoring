import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColorPanel from '../components/molecules/ColorPanel';

import { updateColor as updateColorAction } from '../types/collection/collectionData';
import {
  stockAddColor as atockAddColorAction,
  stockRemoveColor as stockRemoveColorAction,
} from '../stores/color/stockedColors';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/CollectionList';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const stockedColorData = useSelector(
    (state: AppState) => state.stockedColors
  );
  const dispatch = useDispatch();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const currentSingleCollectionData = collectionData[glCollectionOrderKey];

  const updateColor = React.useCallback(
    (val) => {
      dispatch(updateColorAction(val));
    },
    [dispatch]
  );
  const stockAddColor = React.useCallback(
    (val) => {
      dispatch(atockAddColorAction(val));
    },
    [dispatch]
  );
  const stockRemoveColor = React.useCallback(() => {
    dispatch(stockRemoveColorAction());
  }, [dispatch]);

  const combineProps = {
    themeSettings,
    updateColor,
    globalStateColorData: (() => {
      if (
        currentSingleCollectionData.type === 'singleColor' ||
        currentSingleCollectionData.type === 'singleColorMultiBlends' ||
        currentSingleCollectionData.type === 'multiColors'
      ) {
        const globalStateColorDataProp = currentSingleCollectionData.color;
        return globalStateColorDataProp;
      }
      return undefined;
    })(),
    stockedColorData,
    stockAddColor,
    stockRemoveColor,
  };

  return <ColorPanel {...combineProps} />;
};
