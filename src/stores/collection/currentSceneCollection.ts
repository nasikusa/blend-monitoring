import { createSlice } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';

export type currentSceneCollectionType = {
  currentId: IdType;
};

const initialState: currentSceneCollectionType = {
  currentId: 'f3207729-f0ca-4728-9acb-175551c9f442',
};

const slice = createSlice({
  name: 'currentSceneCollection',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
