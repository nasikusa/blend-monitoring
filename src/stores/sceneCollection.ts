import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type sceneCollectionsType = string[];

export type sceneCollectionsDictionaryType = {
  [key: string]: string[];
};

const initialState: sceneCollectionsDictionaryType = {
  [uuidv4()]: [],
};

const slice = createSlice({
  name: 'sceneCollections',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
