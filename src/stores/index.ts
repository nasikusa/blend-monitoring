import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import undoable from 'redux-undo';

import glAllLayerDataReducer from './glAllLayerData';
import glSettingsReducer from './glSettings';
import collectionDataReducer from './collectionData';
import themeSettingsReducer from './themeSettings';
import blendModeOrderReducer from './blendModeOrder';

const reducer = combineReducers({
  glAllLayerData: glAllLayerDataReducer,
  glSettings: glSettingsReducer,
  collectionData: collectionDataReducer,
  themeSettings: themeSettingsReducer,
  blendModeOrder: blendModeOrderReducer,
});

const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof reducer>;

export default store;
