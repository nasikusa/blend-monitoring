import React from 'react';
import { useDispatch } from 'react-redux';
import GeneralFunctionsList from '../components/molecules/GeneralFunctionsList';

import { replaceAll as replaceAllGlSettingsAction } from '../stores/general/glSettings';
import {
  replaceAll as replaceAllStoredMediaAction,
  removeAll as removeAllStoredMediaAction,
} from '../stores/image/storedMedia';
import {
  replaceAll as replaceAllCollectionDataAction,
  removeAll as removeAllCollectionDataAction,
} from '../types/collection/collectionData';
import { replaceAll as replaceAllThemeSettingsAction } from '../stores/general/themeSettings';
import { replaceAll as replaceAllBlendModeOrderAction } from '../stores/blendMode/blendModeOrder';
import { replaceAll as replaceAllStockedColorsAction } from '../stores/color/stockedColors';

export default () => {
  const dispatch = useDispatch();

  const removeAllStoredMedia = React.useCallback(() => {
    dispatch(removeAllStoredMediaAction());
  }, [dispatch]);

  const removeAllCollectionData = React.useCallback(
    (val) => {
      dispatch(removeAllCollectionDataAction(val));
    },
    [dispatch]
  );

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
    removeAllStoredMedia,
    removeAllCollectionData,
    replaceAllGlSettings,
    replaceAllStoredMedia,
    replaceAllCollectionData,
    replaceAllThemeSettings,
    replaceAllBlendModeOrder,
    replaceAllStockedColors,
  };

  return <GeneralFunctionsList {...combineProps} />;
};
