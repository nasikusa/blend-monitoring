import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColorPanel from '../components/molecules/ColorPanel';

import { updateColor as updateColorAction } from '../stores/collectionData';
import {
  stockAddColor as atockAddColorAction,
  stockRemoveColor as stockRemoveColorAction,
} from '../stores/stockedColors';
import { AppState } from '../stores/index';
import { GlCollectionOrderContext } from '../components/molecules/Collections';

export default () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const stockedColorData = useSelector(
    (state: AppState) => state.stockedColors
  );
  const dispatch = useDispatch();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const globalStateColorData = collectionData[glCollectionOrderKey].color;

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
    globalStateColorData,
    stockedColorData,
    stockAddColor,
    stockRemoveColor,
  };

  return <ColorPanel {...combineProps} />;
};
