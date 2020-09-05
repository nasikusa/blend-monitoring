import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueColorType = string;

export type collectionItemValueColorDictionaryType = {
  [key: string]: collectionItemValueColorType;
};

const initialState: collectionItemValueColorDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueColor',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
