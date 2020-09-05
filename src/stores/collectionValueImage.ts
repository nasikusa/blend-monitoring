import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueImageType = string;

export type collectionItemValueImageDictionaryType = {
  [key: string]: collectionItemValueImageType;
};

const initialState: collectionItemValueImageDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueImage',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
