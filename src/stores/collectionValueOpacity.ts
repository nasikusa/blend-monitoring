import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueOpacityType = number;

export type collectionItemValueOpacityDictionaryType = {
  [key: string]: collectionItemValueOpacityType;
};

const initialState: collectionItemValueOpacityDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueOpacity',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
