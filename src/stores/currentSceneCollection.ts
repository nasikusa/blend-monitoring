import { createSlice } from '@reduxjs/toolkit';

export type currentSceneCollectionType = string | null;

const initialState: currentSceneCollectionType = null;

const slice = createSlice({
  name: 'currentSceneCollection',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
