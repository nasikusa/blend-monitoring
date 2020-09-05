import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import undoable from 'redux-undo';

import glSettingsReducer from './glSettings';
import collectionDataReducer from './collectionData';
import themeSettingsReducer from './themeSettings';
import blendModeOrderReducer from './blendModeOrder';
import storedMediaReducer from './storedMedia';
import stockedColorsReducer from './stockedColors';
import presetCollectionValueReducer from './presetCollectionValue';
import collectionReducer from './collection';
import collectionItemReducer from './collectionItem';
import collectionItemValueOpacityReducer from './collectionValueOpacity';
import collectionItemValueImageReducer from './collectionValueImage';
import collectionItemValueColorReducer from './collectionValueColor';
import collectionItemValueVisibilityReducer from './collectionValueVisibility';
import collectionItemValueBlendModeReducer from './collectionValueBlendMode';
import sceneCollectionReducer from './sceneCollection';
import currentSceneCollectionReducer from './currentSceneCollection';

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
  collectionItemValueOpacity: collectionItemValueOpacityReducer,
  collectionItemValueImage: collectionItemValueImageReducer,
  collectionItemValueColor: collectionItemValueColorReducer,
  collectionItemValueVisibility: collectionItemValueVisibilityReducer,
  collectionItemValueBlendMode: collectionItemValueBlendModeReducer,
  sceneCollection: sceneCollectionReducer,
  currentSceneCollection: currentSceneCollectionReducer,
});

const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof reducer>;

export default store;
