import React from 'react';
import { useDispatch } from 'react-redux';
import GeneralFunctionsList from '../components/molecules/GeneralFunctionsList';

import { replaceAll as replaceAllGlSettingsAction } from '../stores/glSettings';
import { replaceAll as replaceAllStoredMediaAction } from '../stores/storedMedia';
import { replaceAll as replaceAllCollectionDataAction } from '../stores/collectionData';
import { replaceAll as replaceAllThemeSettingsAction } from '../stores/themeSettings';
import { replaceAll as replaceAllBlendModeOrderAction } from '../stores/blendModeOrder';
import { replaceAll as replaceAllStockedColorsAction } from '../stores/stockedColors';

export default () => {
  const dispatch = useDispatch();

  const replaceAllGlSettings = React.useCallback(
    (val) => {
      dispatch(replaceAllGlSettingsAction(val));
    },
    [dispatch]
  );
  const replaceAllStoredMedia = React.useCallback(
    (val) => {
      dispatch(replaceAllStoredMediaAction(val));
    },
    [dispatch]
  );
  const replaceAllCollectionData = React.useCallback(
    (val) => {
      dispatch(replaceAllCollectionDataAction(val));
    },
    [dispatch]
  );
  const replaceAllThemeSettings = React.useCallback(
    (val) => {
      dispatch(replaceAllThemeSettingsAction(val));
    },
    [dispatch]
  );
  const replaceAllBlendModeOrder = React.useCallback(
    (val) => {
      dispatch(replaceAllBlendModeOrderAction(val));
    },
    [dispatch]
  );
  const replaceAllStockedColors = React.useCallback(
    (val) => {
      dispatch(replaceAllStockedColorsAction(val));
    },
    [dispatch]
  );

  const combineProps = {
    replaceAllGlSettings,
    replaceAllStoredMedia,
    replaceAllCollectionData,
    replaceAllThemeSettings,
    replaceAllBlendModeOrder,
    replaceAllStockedColors,
  };

  return <GeneralFunctionsList {...combineProps} />;
};
