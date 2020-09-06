import { createSlice } from '@reduxjs/toolkit';

export type currentSceneCollectionType = string | null;

const initialState: currentSceneCollectionType =
  'f3207729-f0ca-4728-9acb-175551c9f442';

const slice = createSlice({
  name: 'currentSceneCollection',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
