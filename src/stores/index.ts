import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import undoable from 'redux-undo';

import glSettingsReducer from './general/glSettings';
import collectionDataReducer from '../types/collection/collectionData';
import themeSettingsReducer from './general/themeSettings';
import blendModeOrderReducer from './blendMode/blendModeOrder';
import storedMediaReducer from './image/storedMedia';
import stockedColorsReducer from './color/stockedColors';
import presetCollectionValueReducer from './collection/presetCollectionValue';
import collectionReducer from './collection/collection';
import collectionItemReducer from './collection/collectionItem';
import collectionItemValueOpacityReducer from './collection/collectionValueOpacity';
import collectionItemValueImageReducer from './collection/collectionValueImage';
import collectionItemValueColorReducer from './collection/collectionValueColor';
import collectionItemValueVisibilityReducer from './collection/collectionValueVisibility';
import collectionItemValueBlendModeReducer from './collection/collectionValueBlendMode';
import sceneCollectionReducer from './collection/sceneCollection';
import currentSceneCollectionReducer from './collection/currentSceneCollection';

const reducer = combineReducers({
  glSettings: glSettingsReducer,
  collectionData: collectionDataReducer,
  themeSettings: themeSettingsReducer,
  blendModeOrder: blendModeOrderReducer,
  storedMedia: storedMediaReducer,
  stockedColors: stockedColorsReducer,
  presetCollectionValue: presetCollectionValueReducer,
  collection: collectionReducer,
  collectionItem: collectionItemReducer,
  collectionValueOpacity: collectionItemValueOpacityReducer,
  collectionValueImage: collectionItemValueImageReducer,
  collectionValueColor: collectionItemValueColorReducer,
  collectionValueVisibility: collectionItemValueVisibilityReducer,
  collectionValueBlendMode: collectionItemValueBlendModeReducer,
  sceneCollection: sceneCollectionReducer,
  currentSceneCollection: currentSceneCollectionReducer,
});

const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof reducer>;

export default store;
